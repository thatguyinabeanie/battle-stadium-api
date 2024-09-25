require "rails_helper"

RSpec.describe ChatChannel do
  let(:user) { create(:user) }

  let(:room_id) { 1 }
  let(:room) { "chat_#{room_id}" }

  before do
    stub_connection current_user: user
  end

  it "rejects subscription with invalid room_id" do
    subscribe(room_id: "invalid")
    expect(subscription).to be_rejected
  end

  it "sets correct subscription data" do
    subscribe(room_id:)
    expect(subscription.subscription_data).to eq({ room_id: })
  end

  it "handles multiple subscriptions" do
    subscribe(room_id:)
    subscribe(room_id: room_id + 1)
    expect(subscription).to have_stream_from("chat_#{room_id + 1}")
  end

  it "successfully subscribes" do
    subscribe(room_id:)
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from(room)
  end

  it "successfully unsubscribes" do
    subscribe(room_id:)
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from(room)
    subscription.unsubscribe_from_channel
    expect(subscription).not_to have_streams
  end

  it "handles unsubscription without prior subscription" do
    subscribe(room_id:)
    expect { unsubscribe }.not_to raise_error
  end

  xit "cleans up associated resources on unsubscription", skip: "Pending implementation of resource cleanup" do # rubocop:disable RSpec/PendingWithoutReason
    subscribe(room_id:)
    expect {
      subscription.unsubscribe_from_channel
    }.to change(AssociatedResource, :count).by(-1)
  end

  it "unsubscribes from multiple rooms" do
    subscribe(room_id:)
    subscribe(room_id: room_id + 1)
    subscription.unsubscribe_from_channel
    expect(subscription).not_to have_streams
  end

  it "broadcasts a message" do
    subscribe(room_id:)
    expect {
      perform :speak, {message: "Hello, World!"}
    }.to have_broadcasted_to(room).with(hash_including(message: "Hello, World!"))
  end

  it "broadcasts message of type text" do
    subscribe(room_id:)
    expect {
      perform :speak, { message: "Text message" }
    }.to have_broadcasted_to(room).with(hash_including(type: "text"))
  end

  it "broadcasts message of type image" do
    subscribe(room_id:)
    expect {
      perform :speak, { message: { url: "https://example.com/image.jpg" } }
    }.to have_broadcasted_to(room).with(hash_including(type: "image"))
  end

  it "handles broadcasting empty message" do
    subscribe(room_id:)
    expect {
      perform :speak, { message: "" }
    }.not_to have_broadcasted_to(room)
  end

  it "handles trying to broadcast a message that passes the 1MB limit" do
    subscribe(room_id:)
    expect {
      perform :speak, { message: "a" * 1_048_577 }  # Slightly over 1MB limit
    }.to raise_error(ArgumentError, "Message is too large")
  end

  it "handles malformed data gracefully" do
    subscribe(room_id:)
    expect {
      perform :speak, { invalid_key: "Malformed data" }
    }.not_to have_broadcasted_to(room)
    # Ensure the channel doesn't crash
    expect(subscription).to be_confirmed
  end
end
