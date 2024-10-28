require_relative "../../../serializers/account_serializer"

module Api
  module V1
    class AccountsController < AbstractApplicationController
      self.klass = ::Account
      self.serializer_klass = Serializers::Account
      self.detail_serializer_klass = Serializers::AccountDetails
      self.default_order_by = { id: :asc }
      self.update_params_except = %i[username]

      def self.policy_class
        ::AccountPolicy
      end

      def me
        if @current_account.nil?
          skip_authorization
          return render json: { error: "Not authorized" }, status: :unauthorized
        end
        authorize @current_account, :me?
        render json: @current_account, serializer: Serializers::AccountMe, status: :ok
      end

      def create
        authorize klass, :create?
        @object = klass.create_with_username(username: params[:username], **permitted_params)
        if @object.save
          render json: serialize_details, status: :created
        else
          render json: @object.errors, status: :unprocessable_entity
        end
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :forbidden
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      end

      protected

      def set_object
        @object =  Profile.where(default: true).find_by!(username: params[:username]).account

        @object
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: "#{klass} not found" }, status: :not_found
      end

      # Only allow a list of trusted parameters through.
      def permitted_params
        params.require(:account).permit(:email, :pronouns, :first_name, :last_name, :country)
      end
    end
  end
end
