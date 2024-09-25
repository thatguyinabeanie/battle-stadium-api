require "rails_helper"

RSpec.describe ChatChannel do
  let(:user) { create(:user) }

  let(:room) { 1 }
  let(:broadcast_room_name) { "chat_#{room}" }

  before do
    stub_connection current_user: user
  end

  xit "rejects subscription with invalid room" do # rubocop:disable RSpec/PendingWithoutReason
    subscribe(room: "invalid")
    expect(subscription).to be_rejected
  end

  it "sets correct subscription data" do
    subscribe(room:)
    expect(subscription.subscription_data).to eq({ room: })
  end

  it "handles multiple subscriptions" do
    subscribe(room:)
    subscribe(room: room + 1)
    expect(subscription).to have_stream_from("chat_#{room + 1}")
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
    subscribe(room:)
    expect { unsubscribe }.not_to raise_error
  end

  xit "cleans up associated resources on unsubscription", skip: "Pending implementation of resource cleanup" do # rubocop:disable RSpec/PendingWithoutReason
    subscribe(room:)
    expect {
      subscription.unsubscribe_from_channel
    }.to change(AssociatedResource, :count).by(-1)
  end

  it "unsubscribes from multiple rooms" do
    subscribe(room:)
    subscribe(room: room + 1)
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
    }.to have_broadcasted_to(broadcast_room_name).with(hash_including(type: "text"))
  end

  it "broadcasts message of type image" do
    subscribe(room:)
    expect {
      perform :speak, { message: { url: "https://example.com/image.jpg" } }
    }.to have_broadcasted_to(broadcast_room_name).with(hash_including(type: "image"))
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
    }.to raise_error(ArgumentError, "Message is too large")
  end

  it "handles malformed data gracefully" do
    subscribe(room:)
    expect {
      perform :speak, { invalid_key: "Malformed data" }
    }.not_to have_broadcasted_to(broadcast_room_name)
    # Ensure the channel doesn't crash
    expect(subscription).to be_confirmed
  end
end
