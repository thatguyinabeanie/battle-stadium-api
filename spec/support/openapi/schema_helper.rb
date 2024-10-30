module OpenApi
  module Schema
    def self.bad_request
      lambda {
        schema type: :object,
               properties: {
                 error: { type: :string }
               },
               required: ["error"],
               example: { error: "bad request" },
               title: "400 Bad Request"
      }
    end
  end
end
