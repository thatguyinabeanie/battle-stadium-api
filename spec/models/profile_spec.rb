require "rails_helper"

RSpec.describe Profile do
  describe "associations" do
    it { is_expected.to belong_to(:account).inverse_of(:profiles).class_name("Account").with_foreign_key("account_id").optional(true) }
    it { is_expected.to have_many(:players).class_name("Player").inverse_of(:profile).with_foreign_key("profile_id") }
    it { is_expected.to have_many(:pokemon_teams).class_name("PokemonTeam").inverse_of(:profile).with_foreign_key("profile_id") }
  end

  describe "validations" do
    subject { create(:profile) } # Ensure a valid profile is created

    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_uniqueness_of(:username) }

    it "validates that only one profile can be default per account" do
      account = create(:account)
      another_profile = build(:profile, account:, default: true)

      expect(another_profile).not_to be_valid
      expect(another_profile.errors[:default]).to include("can only be set to true for one profile per account")
    end

    it "allows multiple profiles to be default = false within the same account" do
      account = create(:account)
      create(:profile, account:, default: false)
      another_profile = build(:profile, account:, default: false)

      expect(another_profile).to be_valid
    end
  end

  describe "delegations" do
    it { is_expected.to delegate_method(:pronouns).to(:account) }
  end

  describe "scopes" do
    it { expect(described_class).to respond_to(:not_archived) }
  end

  describe "#should_generate_new_friendly_id?" do
    it "returns true if the username has changed" do
      profile = create(:profile)
      profile.username = "new_username"
      expect(profile.should_generate_new_friendly_id?).to be(true)
    end
  end
end
