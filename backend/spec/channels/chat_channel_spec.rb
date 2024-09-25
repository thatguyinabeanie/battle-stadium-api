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
    expect { subscription.unsubscribe_from_channel }.not_to raise_error
  end

  it "cleans up associated resources on unsubscription" do
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

  it "broadcasts messages of different types" do
    subscribe(room_id:)
    expect {
      perform :speak, { message: "Text message" }
    }.to have_broadcasted_to(room).with(hash_including(type: "text"))
    expect {
      perform :speak, { message: { url: "https://example.com/image.jpg" } }
    }.to have_broadcasted_to(room).with(hash_including(type: "image"))
  end

  it "handles edge cases in message broadcasting" do
    subscribe(room_id:)
    expect {
      perform :speak, { message: "" }
    }.not_to have_broadcasted_to(room)
    expect {
      perform :speak, { message: "a" * 1000001 }  # Assuming 1MB limit
    }.to raise_error(ActionCable::Channel::ParameterMissing)
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
