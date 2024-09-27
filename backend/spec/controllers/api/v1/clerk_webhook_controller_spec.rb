require "rails_helper"

RSpec.describe Api::V1::ClerkWebhookController, type: :controller do
  describe "POST #post" do
    let(:valid_headers) { { "Content-Type" => "application/json" } }
    let(:valid_payload) do
      {
        type: "user.created",
        data: {
          email_addresses: [{ id: "primary_email_id", email_address: "test@example.com" }],
          primary_email_address_id: "primary_email_id",
          username: "testuser",
          first_name: "Test",
          last_name: "User",
          image_url: "http://example.com/image.png"
        }
      }
    end

    before do
      allow(controller).to receive(:verify_clerk_webhook).and_return(true)

      policy = instance_double(ClerkWebhookPolicy, valid_request?: true)
      allow(ClerkWebhookPolicy).to receive(:new).and_return(policy)


    end

    context "when the event type is user.created" do
      it "creates a new user and returns status created" do
        request.headers.merge!(valid_headers)

        expect {
          post :post, params: valid_payload
        }.to change(User, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(response.parsed_body["message"]).to eq("User created successfully")
      end
    end

    context "when the event type is user.updated" do
      let(:updated_payload) { valid_payload.merge(type: "user.updated") }

      it "returns status no_content with a not yet implemented message" do
        request.headers.merge!(valid_headers)

        post :post, params: updated_payload

        expect(response).to have_http_status(:bad_request)

        expect(JSON.parse(response.body)["message"]).to eq("event type 'user.updated' is not yet implemented") # rubocop:disable Rails/ResponseParsedBody
      end
    end

    context "when the event type is unhandled" do
      let(:invalid_payload) { valid_payload.merge(type: "unknown.event") }

      it "returns status bad_request with an error message" do
        request.headers.merge!(valid_headers)

        post :post, params: invalid_payload

        expect(response).to have_http_status(:bad_request)
        expect(response.parsed_body["error"]).to eq("Unhandled event type")
      end
    end
  end
end
