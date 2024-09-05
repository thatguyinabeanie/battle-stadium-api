# config/routes.rb
Rails.application.routes.draw do
  get 'static/index'
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get '/up' => 'rails/health#show', as: :rails_health_check

  # get '*path', to: 'static#index', constraints: ->(req) { !req.xhr? && req.format.html? }

  devise_for :users,
             path: 'api/v1/auth',
             controllers: {
               registrations: 'api/v1/auth/registrations'
             }

  devise_scope :user do
    post 'api/v1/auth/session', to: 'api/v1/auth/sessions#create'
    get 'api/v1/auth/session', to: 'api/v1/auth/sessions#show'
    put 'api/v1/auth/session', to: 'api/v1/auth/sessions#update'
    delete 'api/v1/auth/session', to: 'api/v1/auth/sessions#destroy'
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post 'users/authorize', to: 'users#password_login'
      get 'users/me', to: 'users#me'

      resources :users, only: %i[index show create destroy update] do
        member do
          patch 'password', to: 'users#patch_password'
        end
      end

      resources :organizations, only: %i[index show create update destroy staff] do
        member do
          post 'tournaments', to: 'organizations#post_tournaments'
          patch 'tournaments/:tournament_id', to: 'organizations#patch_tournament'
        end
        member do
          get 'staff', to: 'organizations#staff'
        end
      end

      resources :tournaments, only: %i[index show] do
        resources :phases, only: %i[index show create update destroy], controller: 'tournaments/phases'
        resources :matches, only: %i[index create update]
        resources :players, only: %i[index show create update destroy], controller: 'tournaments/players'
      end

      resources :games, only: %i[index show create update destroy]

      resources :matches, only: %i[index show update create destroy]
    end
  end
end
