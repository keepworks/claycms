class UpdateUser
  include Interactor

  def call
    context.user.update!(context.params.slice(:first_name, :last_name, :profile_picture))
  end
end
