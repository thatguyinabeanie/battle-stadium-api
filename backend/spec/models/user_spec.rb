require "rails_helper"

RSpec.describe User do
  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }
  let(:pronouns) { "they/them" }
  let(:email) { Faker::Internet.unique.email }
  let(:username) { Faker::Internet.unique.username }

  describe "associations" do
    it { is_expected.to have_one(:default_profile).class_name("UserProfile").dependent(:destroy).inverse_of(:user) }
    it { is_expected.to have_many(:user_profiles).class_name("UserProfile").dependent(:destroy).inverse_of(:user) }
    it { is_expected.to have_one(:owned_organization).class_name("Organization").with_foreign_key("owner_id").dependent(:destroy).inverse_of(:owner) }
    it { is_expected.to have_many(:organization_staff_members).class_name("OrganizationStaffMember").dependent(:destroy) }
    it { is_expected.to have_many(:staff).through(:organization_staff_members).source(:user) }
    it { is_expected.to have_many(:clerk_users).dependent(:destroy).inverse_of(:user).class_name("ClerkUser") }
  end

  describe "validations" do
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

  describe "callbacks" do
    describe "after_create :create_default_profile" do
      it "creates a default profile after user creation" do
        user = described_class.create!(username:, email:, pronouns:, first_name:, last_name:)
        expect(user.default_profile).not_to be_nil
        expect(user.default_profile.username).to eq(user.username)
      end

      it "associates the default profile with the user" do
        user = described_class.create!(username:, email:, pronouns:, first_name:, last_name:)
        expect(user.default_profile.user).to eq(user)
      end
    end
  end
end
