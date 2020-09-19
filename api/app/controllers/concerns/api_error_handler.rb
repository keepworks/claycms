module ApiErrorHandler
  extend ActiveSupport::Concern

  included do
    # IMPORTANT: Exceptions are searched bottom to top
    # http://apidock.com/rails/ActionController/Rescue/ClassMethods/rescue_from

    rescue_from StandardError do |exception|
      raise exception if Rails.env.development? || Rails.env.test?

      Raven.capture_exception(exception)

      render_errors(Exceptions::InternalServerError.new)
    end

    rescue_from Exceptions::APIError do |exception|
      render_errors(exception)
    end

    rescue_from Interactor::Failure do |exception|
      render_errors(Exceptions::APIError.new(exception.context.error))
    end

    rescue_from Exceptions::FormErrors do |exception|
      render_form_errors(exception.errors)
    end

    rescue_from GraphQL::Guard::NotAuthorizedError do |exception|
      render_errors(Exceptions::Forbidden.new)
    end

    rescue_from ActiveRecord::RecordNotFound do |exception|
      render_errors(Exceptions::NotFound.new)
    end

    rescue_from ActiveRecord::RecordInvalid do |exception|
      render_form_errors(exception.record.errors.to_hash)
    end

    rescue_from ActiveRecord::RecordNotDestroyed do |exception|
      errors = exception.record.errors.to_hash
      if errors.count > 1
        render_form_errors(errors)
      else
        message = errors.values.first&.join(', ')
        render_errors(Exceptions::APIError.new(message))
      end
    end
  end

  private

  def render_errors(exception)
    render json: { errors: [{ message: exception.message, type: exception.type }] }, status: exception.status
  end

  def render_form_errors(form_errors)
    record_errors = form_errors.deep_transform_keys { |key| key.to_s.camelize(:lower) }
    errors = record_errors.map do |attribute, attribute_errors|
      {
        message: attribute_errors.join(', '),
        type: Exceptions::APIError::TYPE,
        path: attribute.split('.')
      }
    end
    render json: { errors: errors }, status: Exceptions::APIError::STATUS
  end
end
