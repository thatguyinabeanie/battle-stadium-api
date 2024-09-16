module SerializerMixin
  module Name
    extend ActiveSupport::Concern
    included do
      attributes :name
    end
  end

  module Id
    extend ActiveSupport::Concern
    included do
      attributes :id
    end
  end

  module Timestamp
    extend ActiveSupport::Concern
    included do
      attributes :created_at, :updated_at
    end
  end
end
