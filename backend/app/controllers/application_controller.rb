require 'pundit'
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include Devise::Controllers::Helpers
  include Pundit::Authorization
  after_action :verify_authorized
end
