# config/routes.rb
require "sidekiq/web"

Rails.application.routes.draw do
  get "static/index"
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"
  mount ActionCable.server => "/cable"
  mount Sidekiq::Web => "/sidekiq"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "/up" => "rails/health#show", :as => :rails_health_check

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post "clerk", to: "clerk_webhook#post"
      get "users/me", to: "users#me"

      resources :users, only: %i[index create] do
        collection do
          get ":username", to: "users#show", as: :user, constraints: { username: /[^\/]+/ }
          patch ":username", to: "users#update", constraints: { username: /[^\/]+/ }
          delete ":username", to: "users#destroy", constraints: { username: /[^\/]+/ }
        end
      end

      resources :organizations, only: %i[index show create update destroy staff] do
        member do
          get "tournaments", to: "organizations#list_tournaments"
          post "tournaments", to: "organizations#post_tournament"
        end
        member do
          get "staff", to: "organizations#staff"
        end
      end

      resources :tournaments, only: %i[index show create update destroy] do
        member do
          post "start", to: "tournaments#start_tournament"
        end
        resources :phases, only: %i[index show create update destroy], controller: "tournaments/phases"
        resources :matches, only: %i[index update show], controller: "tournaments/matches" do
          member do
            post "reset", to: "tournaments/matches#reset"
            post "check_in", to: "tournaments/matches#check_in"
          end
        end

        resources :match_games, only: %i[index show], controller: "tournaments/match_games" do
          member do
            post "report_winner", to: "tournaments/match_games#report_winner"
            post "report_loser", to: "tournaments/match_games#report_loser"
          end
        end

        resources :players, only: %i[index show create update destroy], controller: "tournaments/players"
      end

      resources :games, only: %i[index show create update destroy]
    end
  end
end
