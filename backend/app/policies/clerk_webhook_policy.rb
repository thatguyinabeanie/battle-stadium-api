require_relative "../../lib/auth/clerk/webhook"
class ClerkWebhookPolicy < ApplicationPolicy
  def valid_request?
    raise ::Auth::Clerk::Webhook::Error("invalid webhook") unless ::Auth::Clerk::Webhook.validate!(request: record)
    true
  end
end
