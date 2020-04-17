Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :autocompletes, only: [:index]
  end
  resources :transports, only: [:index]
  resources :xtransports, only: [:index]
end
