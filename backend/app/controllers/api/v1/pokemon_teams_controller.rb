require_relative "../../../serializers/pokemon_team_serializer"

module Api
  module V1
    class PokemonTeamsController < AbstractApplicationController
      self.klass = ::PokemonTeam

      def index
        authorize self, :index?
        @objects = klass.where(public: true, archived_at: nil)
        render json: @objects, each_serializer: ::Serializers::PokemonTeam, status: :ok
      end

      def create
        profile = begin
                    if params[:user_profile_id].present?
                      UserProfile.find_by!(id: params[:user_profile_id])
                    else
                      current_user.default_profile
                    end
                  rescue ActiveRecord::RecordNotFound
                    skip_authorization
                    return render json: { error: "User profile not found" }, status: :not_found
                  end

        authorize profile, :create_pokemon_team?

        ActiveRecord::Base.transaction do
          pokemon_team = PokemonTeam.create!(params.permit(:name, :game_id, :format_id, :pokepaste_id).merge(user_profile: profile))

          pokemon_team.pokemon = params[:pokemon].each_with_index.map do |p, position|
            pokemon_team.pokemon.create!(p.permit(:species, :nickname, :gender, :ability, :item, :nature, :tera_type, :nature, :form, :move1, :move2, :move3, :move4).merge(pokemon_team_id: pokemon_team.id, position:))
          end

          if pokemon_team.save
            render json: pokemon_team, status: :created, serializer: ::Serializers::PokemonTeam
          else
            render json: { errors: pokemon_team.errors.full_messages }, status: :unprocessable_entity
          end
        end
      rescue StandardError => e
        skip_authorization
        render json: { error: e.message }, status: :unprocessable_entity
      end
    end
  end
end
