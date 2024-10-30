require "pundit"

module Api
  module V1
    class AbstractApplicationController < ApiController
      class_attribute :klass
      class_attribute :serializer_klass
      class_attribute :index_serializer_klass
      class_attribute :detail_serializer_klass
      class_attribute :update_params_except
      class_attribute :index_filter_params
      class_attribute :enable_pagination
      class_attribute :default_order_by

      before_action :set_object, only: %i[show update destroy]

      def self.policy_class
        ::AccountPolicy
      end

      # GET /api/v1/:klass
      # GET /api/v1/:klass.json
      def index
        authorize klass, :index?

        @objects = klass

        @objects = @objects.order(default_order_by) if default_order_by.present?

        if enable_pagination
          @objects = @objects.page(params[:page] || 0).per(params[:per_page] || 20)

          render json: {
            data: @objects.map { |object| index_serializer.new(object).attributes },
            meta: {
              current_page: @objects.current_page,
              next_page: @objects.next_page,
              prev_page: @objects.prev_page,
              total_pages: @objects.total_pages,
              total_count: @objects.total_count
            }
          }, status: :ok
        else
          render json: @objects, each_serializer: index_serializer, status: :ok
        end
      end

      # GET /api/v1/:klass/:id
      # GET /api/v1/:klass/:id.json
      def show
        authorize @object, :show?
        render json: serialize_details, status: :ok
      end

      # POST /api/v1/:klass
      # POST /api/v1/:klass.json
      def create
        authorize klass, :create?
        @object = klass.create! permitted_params
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

      # PATCH/PUT /api/v1/:klass/:id
      # PATCH/PUT /api/v1/:klass/:id.json
      def update
        authorize @object, :update?
        @object.assign_attributes(permitted_params.except(update_params_except))
        if @object.save
          render json: serialize_details, status: :ok
        else
          render json: @object.errors, status: :unprocessable_entity
        end
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :forbidden
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      end

      # DELETE /api/v1/:klass/:id
      # DELETE /api/v1/:klass/:id.json
      def destroy
        authorize @object, :destroy?
        @object.destroy!
        render json: { message: "#{klass} deleted" }, status: :ok
      rescue Pundit::NotAuthorizedError => e
        render json: { error: e.message }, status: :forbidden
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      end

      protected

      def serialize_details
        serializer_klass = detail_serializer_klass || serializer_klass
        serializer_klass.new(@object).attributes
      end

      def set_object
        @object = if klass.respond_to?(:friendly)
                    id = params[:id] || params[:slug]
                    klass.friendly.find(id)
                  else
                    klass.find(params[:id])
                  end
        @object
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: "#{klass} not found - #{e.message}" }, status: :not_found
      end

      def permitted_params
        raise NotImplementedError
      end

      def index_serializer
        index_serializer_klass || serializer_klass
      end
    end
  end
end
