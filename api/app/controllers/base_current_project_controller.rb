class BaseCurrentProjectController < ApplicationController
  attr_reader :current_project

  before_action :set_current_project
  before_action :set_error_context

  private

  def set_current_project
    public_key = request.headers['X-Public-Key']
    raise Exceptions::Unauthorized, 'Missing header: X-Public-Key' if public_key.blank?

    key_pair = KeyPair.find_by(public_key: public_key)
    raise Exceptions::Unauthorized, 'Incorrect value passed for header: X-Public-Key' if key_pair.blank?

    @current_project = key_pair.project
  end

  def set_error_context
    return if current_project.blank?

    Raven.user_context(
      id: "project-#{current_project.id}",
      name: "Project: #{current_project.name}"
    )
  end
end
