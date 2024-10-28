require "rails_helper"

RSpec.describe Account do
  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }
  let(:pronouns) { "they/them" }
  let(:email) { Faker::Internet.unique.email }
  let(:username) { Faker::Internet.unique.username }

  describe "associations" do
    it { is_expected.to have_one(:rk9_profile).class_name("Rk9Profile").inverse_of(:account).with_foreign_key("account_id").dependent(:nullify) }
    it { is_expected.to have_one(:default_profile).class_name("Profile").dependent(:destroy).inverse_of(:account) }
    it { is_expected.to have_many(:profiles).class_name("Profile").dependent(:nullify).inverse_of(:account) }
    it { is_expected.to have_one(:owned_organization).class_name("Organization").with_foreign_key("owner_id").dependent(:destroy).inverse_of(:owner) }
    it { is_expected.to have_many(:organization_staff_members).class_name("OrganizationStaffMember").dependent(:destroy) }
    it { is_expected.to have_many(:staff).through(:organization_staff_members).source(:account) }
    it { is_expected.to have_many(:clerk_users).dependent(:destroy).inverse_of(:account).class_name("ClerkUser") }
  end

  describe "validations" do
    it "is valid with valid attributes" do
      account = described_class.new(username:, email:, pronouns:, first_name:, last_name:)
      expect(account).to be_valid
    end

    it "is not valid without a first name" do
      account = described_class.new(username:, email:, pronouns:, last_name:)
      expect(account).not_to be_valid
    end

    it "is not valid without a last name" do
      account = described_class.new(username:, email:, pronouns:, first_name:)
      expect(account).not_to be_valid
    end

    it "is not valid without an email" do
      account = described_class.new(username:, pronouns:, first_name:, last_name:)
      expect(account).not_to be_valid
    end

    # it "is not valid without a username" do
    #   account = described_class.new(email:, pronouns:, first_name:, last_name:)
    #   expect(account).not_to be_valid
    # end
  end

  describe "callbacks" do
    describe "after_create :create_default_profile" do
      it "creates a default profile after account creation" do
        account = described_class.create!(username:, email:, pronouns:, first_name:, last_name:)
        expect(account.default_profile).not_to be_nil
        expect(account.default_profile.username).to eq(account.username)
      end

      it "associates the default profile with the account" do
        account = described_class.create!(username:, email:, pronouns:, first_name:, last_name:)
        expect(account.default_profile.account).to eq(account)
      end
    end
  end
end
