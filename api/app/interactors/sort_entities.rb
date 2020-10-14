class SortEntities
  include Interactor

  def call
    update_entities
  end

  protected

  def update_entities
    context.entities.each(&:save!)
  end
end
