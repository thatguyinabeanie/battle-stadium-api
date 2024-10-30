require "rails_helper"

RSpec.describe EqualityValidator, type: :validator do
  let(:model) do
    Class.new do
      include ActiveModel::Validations
      attr_accessor :attribute

      validates :attribute, equality: { value: "expected_value" }
    end.new
  end
  let(:validator) { described_class.new(attributes: :attribute, options: { value: "expected_value" }) }
  let(:record) { model }

  context "when the attribute value is equal to the expected value" do
    it "is valid" do
      model.attribute = "expected_value"
      expect(model).to be_valid
    end
  end

  context "when the attribute value is not equal to the expected value" do
    it "is not valid" do
      model.attribute = "unexpected_value"
      expect(model).not_to be_valid
      expect(model.errors[:attribute]).to include("must be equal to expected_value")
    end
  end
end
