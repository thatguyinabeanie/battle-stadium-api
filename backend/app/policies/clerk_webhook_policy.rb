require_relative "../../lib/clerk_jwt"
class ClerkWebhookPolicy < ApplicationPolicy
  def valid_request?
    raise ::ClerkJWT::Webhook::Error("invalid webhook") if ::ClerkJWT::Webhook.validate!(request: record).nil?
    true
  end
end
