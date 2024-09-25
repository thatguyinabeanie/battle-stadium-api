require "rails_helper"

RSpec.describe ChatChannel do
  let(:room_id) { 1 }
  let(:room) { "chat_#{room_id}" }

  before do
    stub_connection current_user: create(:user)
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

  it "broadcasts a message" do
    subscribe(room_id:)
    expect {
      perform :speak, {message: "Hello, World!"}
    }.to have_broadcasted_to(room).with(hash_including(message: "Hello, World!"))
  end
end
