module V1
  class EntitiesController < BaseCurrentProjectController
    def index
      render json: { entities: current_project.entities }
    end

    def show
      entity = current_project.entities.find(params[:id])
      json = entity.attributes
      json[:fields] = entity.fields.to_a

      render json: { entity: json }
    end
  end
end
