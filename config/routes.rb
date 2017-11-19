Rails.application.routes.draw do
  root "game#index"

  resources :game do
    collection do
      post :start
      post :clear
    end
  end
end
