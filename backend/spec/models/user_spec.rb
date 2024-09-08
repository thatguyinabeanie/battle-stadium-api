require "rails_helper"

RSpec.describe User do
  describe "validations" do
    let(:first_name) { Faker::Name.first_name }
    let(:last_name) { Faker::Name.last_name }
    let(:pronouns) { "they/them" }
    let(:email) { Faker::Internet.unique.email }
    let(:username) { Faker::Internet.unique.username }

    it "is valid with valid attributes" do
      user = described_class.new(username:, email:, pronouns:, first_name:, last_name:)
      expect(user).to be_valid
    end

    it "is not valid without a first name" do
      user = described_class.new(username:, email:, pronouns:, last_name:)
      expect(user).not_to be_valid
    end

    it "is not valid without a last name" do
      user = described_class.new(username:, email:, pronouns:, first_name:)
      expect(user).not_to be_valid
    end

    it "is not valid without an email" do
      user = described_class.new(username:, pronouns:, first_name:, last_name:)
      expect(user).not_to be_valid
    end

    it "is not valid without a username" do
      user = described_class.new(email:, pronouns:, first_name:, last_name:)
      expect(user).not_to be_valid
    end
  end
end
