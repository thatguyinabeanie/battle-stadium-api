require 'rails_helper'

RSpec.describe Tournaments::Player do
  describe 'associations' do
    it { is_expected.to belong_to(:user).class_name('User') }
    it { is_expected.to belong_to(:tournament).class_name('Tournaments::Tournament').inverse_of(:players) }
    it { is_expected.to belong_to(:pokemon_team).class_name('PokemonTeam').optional(true) }
  end

  describe 'validations' do
    subject { create(:tournament_player) }

    it { is_expected.to validate_presence_of(:user_id) }

    it { is_expected.to validate_presence_of(:tournament_id) }

    it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:tournament_id).with_message(I18n.t('tournament.registration.already_registered')) }
  end

  describe 'nested attributes' do
    it { is_expected.to accept_nested_attributes_for(:pokemon_team) }
  end

  describe 'delegations' do
    it { is_expected.to delegate_method(:username).to(:user) }
  end

  describe '#checked_in?' do
    subject(:player) { described_class.new(tournament:, user:) }

    let(:user) { create(:user) }
    let(:tournament) { create(:tournament, start_at: 1.hour.from_now, check_in_start_at: 1.hour.ago) }

    it 'returns true if checked_in_at is present' do
      player.check_in!
      expect(player.checked_in?).to be true
    end

    it 'returns false if checked_in_at is not present' do
      expect(player.checked_in?).to be false
    end
  end
end
