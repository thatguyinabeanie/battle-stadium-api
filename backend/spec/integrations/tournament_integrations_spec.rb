require 'rails_helper'

RSpec.describe 'Tournaments API', type: :request do
  pending 'add some examples to (or delete) #{__FILE__}' do
  let(:user) { create(:user) }
  let(:organization) { create(:organization, owner: user) }
  let(:tournament) { create(:tournament, organization:) }

  # before do
  #   sign_in user
  # end

  def json
    JSON.parse(response.body)
  end

  context 'when /api/v1/organizations/:organization_id/tournaments' do
    describe 'GET' do
      let!(:tournaments) { (1..10).each { |n| create(:tournament, organization:, start_at: n.weeks.from_now) } }
      let(:path_route) { "/api/v1/organizations/#{organization.id}/tournaments" }

      it 'returns http status :success' do
        get path_route
        expect(response).to have_http_status(:success)
      end

      it 'returns a list of tournaments' do
        get path_route
        expect(json.size).to eq(tournaments.size)
      end
    end

    describe 'POST' do
      let(:path_route) { "/api/v1/organizations/#{organization.id}/tournaments" }
      let(:game) { create(:game) }
      let(:format) { create(:format, game:) }
      let(:tournament_params) do
        { tournament: {
          name: 'New Tournament',
          game_id: game.id,
          format_id: format.id
        } }
      end

      it 'returns http status :created' do
        post path_route, params: tournament_params
        expect(response).to have_http_status(:created)
      end

      it 'creates a tournament' do
        post path_route, params: tournament_params
        expect(json).to include_json(name: 'New Tournament')
      end
    end
  end

  context 'when /api/v1/organizations/:organization_id/tournaments/:id' do
    describe 'GET' do
      let(:path_route) { "/api/v1/organizations/#{organization.id}/tournaments/#{tournament.id}" }

      it 'returns http status :success' do
        get path_route
        expect(response).to have_http_status(:success)
      end

      it 'returns a tournament' do
        get path_route
        expect(json).to include_json(id: tournament.id)
      end
    end

    describe 'PUT' do
      let(:path_route) { "/api/v1/organizations/#{organization.id}/tournaments/#{tournament.id}" }

      it 'returns http status :success' do
        put path_route, params: { tournament: { name: 'Updated Tournament' } }
        expect(response).to have_http_status(:success)
      end

      it 'updates a tournament' do
        put path_route, params: { tournament: { name: 'Updated Tournament' } }
        expect(json).to include_json(name: 'Updated Tournament')
      end
    end

    describe 'DELETE' do
      let(:path_route) { "/api/v1/organizations/#{organization.id}/tournaments/#{tournament.id}" }

      it 'deletes a tournament' do
        delete path_route
        expect(response).to have_http_status(:success)
      end
    end
  end
end
end
