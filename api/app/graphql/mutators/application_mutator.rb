class ApplicationMutator < ApplicationFunction
  include GraphQL::Sugar::Mutator

  protected

  def permitted_params
    params[:input]
  end
end
