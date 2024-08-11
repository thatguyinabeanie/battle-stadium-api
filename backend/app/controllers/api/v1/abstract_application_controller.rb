module Api
  module V1
    class AbstractApplicationController < ApiController
      class_attribute :klass
      class_attribute :serializer_klass
      class_attribute :index_serializer_klass
      class_attribute :detail_serializer_klass
      class_attribute :update_params_except

      before_action :set_object, only: %i[show update destroy]

      # GET /api/v1/:klass
      # GET /api/v1/:klass.json
      def index
        @objects = klass.all
        render json: @objects, each_serializer: index_serializer, status: :ok
      end

      # GET /api/v1/:klass/:id
      # GET /api/v1/:klass/:id.json
      def show
        render json: serialize_details, status: :ok
      end

      # POST /api/v1/:klass
      # POST /api/v1/:klass.json
      def create
        @object = klass.create! permitted_params
        if @object.save
          render json: serialize_details, status: :created
        else
          render json: @object.errors, status: :unprocessable_entity
        end
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      end

      # PATCH/PUT /api/v1/:klass/:id
      # PATCH/PUT /api/v1/:klass/:id.json
      def update
        if @object.update permitted_params.except(update_params_except)
          render json: serialize_details, status: :ok
        else
          render json: @object.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/:klass/:id
      # DELETE /api/v1/:klass/:id.json
      def destroy
        @object.destroy!
        render json: { message: "#{klass} deleted" }, status: :ok
      end

      protected

      def serialize_details
        detail_serializer_klass.new(@object).attributes
      end

      def set_object
        @object = klass.find(params[:id])
        @object
      rescue ActiveRecord::RecordNotFound
        render json: { error: "#{klass} not found" }, status: :not_found
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
