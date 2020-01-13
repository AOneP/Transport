Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :autocompletes, only: [:index]
  resources :transports, only: [:index]
end
