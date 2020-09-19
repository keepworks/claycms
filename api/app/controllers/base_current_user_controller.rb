class BaseCurrentUserController < ApplicationController
  attr_reader :current_user

  before_action :set_current_user
  before_action :set_error_context

  private

  def set_current_user
    return if request.headers['Authorization'].blank?

    bearer_token = request.headers['Authorization'].split(' ').last

    context = AuthenticateUser.call(bearer_token: bearer_token)
    raise Exceptions::Unauthorized, context.error if context.failure?

    @current_user = context.user
  end

  def set_error_context
    return if current_user.blank?

    Raven.user_context(
      id: current_user.id,
      email: current_user.email,
      name: "#{current_user.first_name} #{current_user.last_name}".strip
    )
  end
end
