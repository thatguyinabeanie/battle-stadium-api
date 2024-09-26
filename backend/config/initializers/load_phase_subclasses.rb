require Rails.root.join("app/validators/equality_validator.rb")
require Rails.root.join("app/models/application_record.rb")
Dir[Rails.root.join("app/models/phases/*.rb")].each { |file| require file }
