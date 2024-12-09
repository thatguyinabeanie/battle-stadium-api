require "rails_helper"

RSpec.describe Tournament do
  let(:organization) { create(:organization) }
  let(:game) { create(:game) }
  let(:format) { create(:format, game:) }

  describe "validations" do
    subject(:tournament) { build(:tournament) }

    before do
      tournament.organization = organization
      tournament.game = game
      tournament.format = format
    end


    it { is_expected.to validate_presence_of(:organization_id) }
    it { is_expected.to validate_presence_of(:organization) }
    it { is_expected.to validate_presence_of(:game) }

    it { is_expected.to validate_numericality_of(:player_cap).only_integer.is_greater_than(3).allow_nil }

    context "when game is present" do
      before { tournament.game = game }

      it { is_expected.to validate_presence_of(:format) }
    end

    context "when game is not present" do
      before { tournament.game = nil }

      it { is_expected.not_to validate_presence_of(:format) }
    end

    context "when late_registration is true" do
      before { tournament.late_registration = true }

      it { is_expected.not_to validate_presence_of(:registration_end_at) }
    end

    context "when start_at is not present" do
      before { tournament.start_at = nil }

      it { is_expected.not_to validate_presence_of(:check_in_start_at) }
    end
  end

  describe "associations" do
    it { is_expected.to belong_to(:organization).class_name("Organization") }
    it { is_expected.to belong_to(:game).class_name("Game") }
    it { is_expected.to belong_to(:format).class_name("Format") }
    it { is_expected.to have_many(:phases).class_name("Phases::BasePhase").dependent(:destroy_async) }
    it { is_expected.to have_many(:players).class_name("Player").dependent(:destroy_async) }
  end

  describe "callbacks" do
    context "when before_validation" do
      let(:organization) { create(:organization) }
      let(:tournament) { build(:tournament, organization:) }

      it "calls #set_defaults and sets the tournaments name" do
        tournament.name = nil
        expect(tournament.valid?).to be true
        expect(tournament.name).not_to be_nil
      end
    end
  end

  describe "#ready_to_start?" do
    let(:tournament) do
      create(:tournament) do |tournament|
        tournament.phases << create(:swiss_phase, tournament:)
      end
    end

    context "when the tournament is not ready to start" do
      it "returns false" do
        expect(tournament.ready_to_start?).to be false
      end
    end

    context "when the tournament is ready to start" do
      let(:pokemon_team) { create(:pokemon_team) }
      let(:num_of_checked_in_players) { 5 }
      let(:players_checked_in) do
        create_list(:player_checked_in, num_of_checked_in_players, tournament:)
      end

      let(:num_of_players_with_teams) { 5 }
      let(:players_with_teams) { create_list(:player_with_team, num_of_players_with_teams, tournament:) }

      it "returns true" do
        players_with_teams.sample(2).each(&:check_in!)
        players_checked_in.sample(2).each do |player|
          player.submit_team!(pokemon_team:)
        end

        expect(tournament.ready_to_start?).to be true
      end
    end
  end

  describe "#start_tournament!" do
    context "when the tournament is not ready to start" do
      let(:tournament) { create(:tournament, :with_phases) }

      it "raises an error" do
        expect { tournament.start! }.to raise_error(Tournament::NotEnoughPlayers)
      end
    end

    context "when the tournament is ready to start" do
      let(:tournament) { create(:tournament, :with_phases, :with_players_with_team, :with_players_checked_in, :with_players_with_team_and_checked_in) }

      it "starts the tournament" do
        expect { tournament.start! }.to change(tournament, :started_at).from(nil)
      end

      it "accepts players into the first phase" do
        expect { tournament.start! }.to change { tournament.phases.first.players.count }.from(0).to(5)
      end

      it "only accepts players into the first phase that are checked in and have submitted a team." do
        tournament.start!
        eligible_players = tournament.players.checked_in_and_submitted_team_sheet

        expect(eligible_players).to match_array(tournament.phases.first.players)
      end

      it "does not accept players into the first phase if they are not checked in or have not submitted a team." do
        tournament.start!
        not_eligible_players = tournament.players - tournament.players.checked_in_and_submitted_team_sheet
        expect(not_eligible_players).not_to match_array(tournament.phases.first.players)
      end
    end
  end

  describe "#register" do
    let(:tournament) { create(:tournament, :with_phases, :with_players_with_team_and_checked_in) }
    let(:profile) { create(:profile) }
    let(:pokemon_team) { create(:pokemon_team) }
    let(:in_game_name) { "in_game_name" }

    context "when profile is nil" do
      it "raises an error" do
        expect { tournament.register!(profile: nil, in_game_name:) }.to raise_error("Profile must be provided.")
      end
    end

    context "when profile is already registered" do

      it "raises an error" do
        profile = tournament.players.first.profile
        expect { tournament.register!(profile:, in_game_name:) }.to raise_error("Profile is already registered for the tournament")
      end
    end

    context "when registration is closed" do
      before { allow(tournament).to receive(:registration_open?).and_return(false) }

      it "raises an error" do
        expect { tournament.register!(profile:, in_game_name:) }.to raise_error("Tournament registration is closed.")
      end
    end

    context "when registration is open" do
      before { allow(tournament).to receive(:registration_open?).and_return(true) }

      it "registers the profile" do
        pokemon_team_id = pokemon_team.id
        in_game_name = "in_game_name"
        expect { tournament.register!(profile:, pokemon_team_id:, in_game_name:) }.to change(tournament.players, :count).by(1)
      end

      it "associates the profile with the tournament" do
        tournament.register!(profile:, pokemon_team_id: pokemon_team.id, in_game_name:)
        expect(tournament.players.last.profile).to eq(profile)
      end

      it "associates the pokemon team with the player" do
        tournament.register!(profile:, pokemon_team_id: pokemon_team.id, in_game_name:)
        expect(tournament.players.last.pokemon_team_id).to eq(pokemon_team.id)
      end


      context "when another profile from the same account is already registered" do
        let(:another_profile) { create(:profile, account: profile.account) }

        before { tournament.register!(profile:, in_game_name: "obama") }

        it "raises an error" do
          expect { tournament.register!(profile: another_profile, in_game_name: "bobby") }.to raise_error("This profile's account already has another profile registered for the same tournament")
        end
      end
    end
  end

  describe "#unregister" do
    let(:tournament) { create(:tournament, :with_phases) }
    let(:profile) { create(:profile) }
    let(:player) { create(:player, tournament:, profile:) }

    context "when profile is nil" do
      it "raises an error" do
        expect { tournament.unregister(profile: nil) }.to raise_error("Profile must be provided.")
      end
    end

    context "when profile is not registered" do
      it "raises an error" do
        expect { tournament.unregister(profile:) }.to raise_error("Profile is not registered for the tournament.")
      end
    end

    context "when profile is registered" do
      before { player }

      it "unregisters the profile" do
        expect { tournament.unregister(profile:) }.to change(tournament.players, :count).by(-1)
      end

      it "removes the association between the profile and the tournament" do
        tournament.unregister(profile:)
        expect(tournament.players.exists?(profile_id: profile.id)).to be false
      end
    end
  end
end
