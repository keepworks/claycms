module Exceptions
  class APIError < StandardError
    MESSAGE = nil
    TYPE = 'UNPROCESSABLE_ENTITY'.freeze
    STATUS = 422

    def initialize(message = nil)
      super(message || self.class::MESSAGE)
    end

    def type
      self.class::TYPE
    end

    def status
      self.class::STATUS
    end
  end

  class FormErrors < APIError
    attr_reader :errors

    def initialize(errors)
      @errors = errors
      super(nil)
    end
  end

  class Unauthorized < APIError
    MESSAGE = 'You must be logged in to continue.'.freeze
    TYPE = 'UNAUTHORIZED'.freeze
    STATUS = 401
  end

  class Forbidden < APIError
    MESSAGE = 'You are not allowed to access this resource.'.freeze
    TYPE = 'FORBIDDEN'.freeze
    STATUS = 403
  end

  class NotFound < APIError
    MESSAGE = 'The resource you are looking for does not exist.'.freeze
    TYPE = 'NOT_FOUND'.freeze
    STATUS = 404
  end

  class InternalServerError < APIError
    MESSAGE = "We're sorry, but something went wrong! Please try again after some time.".freeze
    TYPE = 'INTERNAL_SERVER_ERROR'.freeze
    STATUS = 500
  end
end
