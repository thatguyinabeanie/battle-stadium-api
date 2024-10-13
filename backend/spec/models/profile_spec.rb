require "rails_helper"

RSpec.describe Profile do
  describe "associations" do
    it { is_expected.to belong_to(:account).inverse_of(:profiles).class_name("Account").with_foreign_key("account_id").optional(true) }
    it { is_expected.to have_many(:players).class_name("Tournaments::Player").inverse_of(:profile).with_foreign_key("profile_id") }
    it { is_expected.to have_many(:pokemon_teams).class_name("PokemonTeam").inverse_of(:profile).with_foreign_key("profile_id") }
  end

  describe "validations" do
    subject { create(:profile) } # Ensure a valid profile is created

    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_uniqueness_of(:username) }
  end

  describe "delegations" do
    it { is_expected.to delegate_method(:pronouns).to(:account) }
  end

  describe "scopes" do
    it { expect(described_class).to respond_to(:not_archived) }
  end

  describe "#default?" do
    it "returns true if the user's default profile is the same as the current profile" do
      account = create(:account)
      profile = create(:profile, account:)
      account.default_profile = profile
      expect(profile.default?).to be(true)
    end
  end

  describe "#should_generate_new_friendly_id?" do
    it "returns true if the username has changed" do
      profile = create(:profile)
      profile.username = "new_username"
      expect(profile.should_generate_new_friendly_id?).to be(true)
    end
  end
end
