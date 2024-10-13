require_relative "../../../serializers/account_serializer"

module Api
  module V1
    class AccountsController < AbstractApplicationController
      self.klass = ::Account
      self.serializer_klass = Serializers::Account
      self.detail_serializer_klass = Serializers::AccountDetails
      self.default_order_by = { username: :asc }

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

      protected

      def set_object
        @object =  Account.find_by!(username: params[:username])

        @object
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: "#{klass} not found" }, status: :not_found
      end

      # Only allow a list of trusted parameters through.
      def permitted_params
        params.require(:account).permit(:id, :username, :email, :pronouns, :first_name, :last_name)
      end

      private

      def find_account_by_email_or_username(email, username)
        Account.find_for_database_authentication(email:) || Account.find_for_database_authentication(username:)
      end
    end
  end
end
