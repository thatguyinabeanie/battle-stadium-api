# config/routes.rb
Rails.application.routes.draw do
  get "static/index"
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "/up" => "rails/health#show", :as => :rails_health_check

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post "clerk", to: "clerk_webhook#post"
      get "users/me", to: "users#me"

      resources :users, only: %i[index create] do
        collection do
          get ":username", to: "users#show"
          put ":username", to: "users#update"
          patch ":username", to: "users#update"
          delete ":username", to: "users#destroy"
        end
      end

      resources :organizations, only: %i[index show create update destroy staff] do
        member do
          get "tournaments", to: "organizations#list_tournaments"
          post "tournaments", to: "organizations#post_tournaments"
          patch "tournaments/:tournament_id", to: "organizations#patch_tournament"
        end
        member do
          get "staff", to: "organizations#staff"
        end
      end

      resources :tournaments, only: %i[index show] do
        resources :phases, only: %i[index show create update destroy], controller: "tournaments/phases"
        resources :matches, only: %i[index create update]
        resources :players, only: %i[index show create update destroy], controller: "tournaments/players"
      end

      resources :games, only: %i[index show create update destroy]

      resources :matches, only: %i[index show update create destroy]
    end
  end
end
