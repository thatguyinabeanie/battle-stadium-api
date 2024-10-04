require "rails_helper"

RSpec.describe ChatChannel do

  let(:organization) do
    org = create(:organization)
    org.staff << create(:user)
    org.save!
    org
  end
  let(:tournament) { create(:tournament, organization:) }

  let(:broadcast_room_name) { "chat_#{room}" }
  let(:room) { match_hash[:match].id }
  let(:user) { match_hash[:player_one].profile.user }
  let(:match2_hash) { fully_formed_match }
  let(:match_hash) { fully_formed_match }

  def fully_formed_match
    player_one = create(:player)
    player_two = create(:player)

    phase = create(:swiss_phase, tournament:)
    round = create(:round, phase:)
    match = create(:match, round:, player_one:, player_two:)
    match_game = create(:match_game, match:)
    { match_game:, tournament:, organization:, match:, phase:, round:, player_one: match.player_one, player_two: match.player_two,
      staff_member: organization.staff.first }
  end

  before do
    stub_connection current_user: user
  end

  it "rejects subscription with invalid room" do
    subscribe(room: "invalid")
    expect(subscription).to be_rejected
  end

  it "sets correct subscription data" do
    subscribe(room:)
    expect(subscription.chat_channel).to eq("chat_#{room}")
  end

  it "handles multiple subscriptions" do
    stub_connection current_user: organization.staff.first

    subscribe(room:)
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("chat_#{match_hash[:match].id}")

    subscribe(room: match2_hash[:match].id)
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("chat_#{match2_hash[:match].id}")
  end

  it "successfully subscribes" do
    subscribe(room:)
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from(broadcast_room_name)
  end

  it "successfully unsubscribes" do
    subscribe(room:)
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from(broadcast_room_name)
    subscription.unsubscribe_from_channel
    expect(subscription).not_to have_streams
  end

  it "handles unsubscription without prior subscription" do
    expect { unsubscribe }.to raise_error(RuntimeError, "Must be subscribed!")
  end

  it "unsubscribes from multiple rooms" do
    stub_connection current_user: organization.staff.first

    subscribe(room:)
    subscribe(room: match2_hash[:match].id)
    subscription.unsubscribe_from_channel
    expect(subscription).not_to have_streams
  end

  it "broadcasts a message" do
    subscribe(room:)
    expect {
      perform :speak, {message: "Hello, World!"}
    }.to have_broadcasted_to(broadcast_room_name).with(hash_including(message: "Hello, World!"))
  end

  it "broadcasts message of type text" do
    subscribe(room:)
    expect {
      perform :speak, { message: "Text message" }
    }.to have_broadcasted_to(broadcast_room_name).with(hash_including(message_type: "text"))
  end

  it "handles broadcasting empty message" do
    subscribe(room:)
    expect {
      perform :speak, { message: "" }
    }.not_to have_broadcasted_to(broadcast_room_name)
  end

  it "handles trying to broadcast a message that passes the 1MB limit" do
    subscribe(room:)
    expect {
      perform :speak, { message: "a" * 1_048_577 }  # Slightly over 1MB limit
    }.to raise_error(ChatChannel::MessageTooLargeError, "Message size exceeds the maximum limit of 1MB")
  end

  it "handles malformed data gracefully" do
    subscribe(room:)
    expect {
      perform :speak, { invalid_key: "Malformed data" }
    }.not_to have_broadcasted_to(broadcast_room_name)
    # Ensure the channel doesn't crash
    expect(subscription).to be_confirmed
  end

  it "rejects subscription if the match's round is over" do
    match_hash[:round].update(ended_at: Time.current - 1.day)
    subscribe(room:)
    expect(subscription).to be_rejected
  end

  it "does not broadcast message if the user is already subscribed when the round is over" do
    match = match_hash[:match]
    subscribe(room: match.id)
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from(broadcast_room_name)

    match.update(ended_at: Time.current - 1.day)
    match.round.update(ended_at: Time.current - 1.day)

    expect {
      perform :speak, { message: "This should not be sent" }
    }.not_to have_broadcasted_to(broadcast_room_name).with(hash_including(message: "This should not be sent"))
  end

  it "broadcasts system message if the user is already subscribed when the round is over" do
    match = match_hash[:match]
    subscribe(room: match.id)
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from(broadcast_room_name)

    match.update(ended_at: Time.current - 1.day)
    match.round.update(ended_at: Time.current - 1.day)

    expect {
      perform :speak, { message: "This should not be sent" }
    }.to have_broadcasted_to(broadcast_room_name).with(hash_including(message: "Match completed. No further messages allowed."))
  end
end
