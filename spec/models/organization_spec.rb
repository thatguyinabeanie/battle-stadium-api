require "rails_helper"

RSpec.describe Organization do
  describe "validations" do
    # Ensure an organization instance exists for the uniqueness test
    subject(:organization) { create(:organization) }

    before { create(:account) }

    it { is_expected.to validate_presence_of(:name) }

    it "validates uniqueness of owner_id" do
      expect(organization).to validate_uniqueness_of(:owner_id).case_insensitive
    end
  end

  describe "associations" do
    let(:org_owner) { create(:account) }
    let(:organization) { create(:organization, owner: org_owner) }

    it { is_expected.to belong_to(:owner).class_name("Account").optional }
    it { is_expected.to have_many(:organization_staff_members).class_name("OrganizationStaffMember").dependent(:destroy) }
    it { is_expected.to have_many(:staff).through(:organization_staff_members).source(:account) }
    it { is_expected.to have_many(:tournaments).class_name("Tournament").dependent(:destroy) }

    describe "adding and removing staff" do
      let(:account) { create(:account) }

      it "adds account to organization staff" do
        organization.update!(staff: [account])
        expect(organization.staff).to include(account)
      end

      it "removes account from organization staff" do
        organization.update!(staff: [account])
        organization.staff.delete(account)
        organization.save!
        expect(organization.staff).to be_empty
      end
    end

    describe "adding and removing tournaments" do
      let(:tournament) { create(:tournament) }

      it "adds tournament to organization tournaments" do
        organization.update!(tournaments: [tournament])
        expect(organization.tournaments).to include(tournament)
      end

      it "removes tournament from organization tournaments" do
        organization.update!(tournaments: [tournament])
        organization.tournaments.delete(tournament)
        organization.save!
        expect(organization.tournaments).to be_empty
      end
    end
  end

  describe "friendly_id" do
    it "uses the name attribute for friendly_id" do
      owner = create(:account)
      organization = described_class.create!(name: "My Organization", owner:)
      expect(organization.friendly_id).to eq("my-organization")
    end
  end
end
