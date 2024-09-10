require_relative "../../lib/clerk_jwt"
class ClerkWebhookPolicy < ApplicationPolicy
  def valid_request?
    raise ::ClerkJwt::Webhook::Error("invalid webhook") if ::ClerkJwt::Webhook.validate!(request: record).nil?
    true
  end
end
