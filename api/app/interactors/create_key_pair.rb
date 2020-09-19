class CreateKeyPair
  include Interactor

  def call
    context.key_pair = context.project.key_pairs.create!
  end
end
