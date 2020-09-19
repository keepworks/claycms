Rails.application.routes.draw do
  namespace :v1 do
    resources :entities, only: [:index, :show]
    get '/content', to: 'content#find'
  end

  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?

  post '/graphql', to: 'graphql#execute'

  post '/rest/version/1/logLevel/:level', to: 'control_interface#configure_logging'
end
