class CreateTransferRequest
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      find_user
      validate_user
      initiate_transfer
    end
  end

  def find_user
    @user = User.find_by(id: context.params[:user_id])
  end

  def validate_user
    context.fail!(error: 'The user you have selected does not exist.') if @user.blank?

    team_membership = context.team.team_memberships.find_by(user: @user)
    context.fail!(error: 'The user you have selected does not belong to this team.') if team_membership.blank?
    context.fail!(error: 'The user you have selected is already the owner of this team.') if team_membership.owner?
  end

  def initiate_transfer
    context.team.request_transfer_to!(@user)
  end
end
