class ApplicationController < ActionController::Base
  include Devise::Controllers::Helpers

  # include Response
  # include ExceptionHandler
  # include ActionController::MimeResponds

  # before_action :set_locale

  # def set_locale
  #   I18n.locale = params[:locale] || I18n.default_locale
  # end
end
