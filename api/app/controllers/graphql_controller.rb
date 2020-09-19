class GraphqlController < BaseCurrentUserController
  before_action :set_context
  before_action :set_operations

  def execute
    if @operations.is_a? Array
      queries = @operations.map(&method(:build_query))
      result = ClayApiSchema.multiplex(queries)
    else
      result = ClayApiSchema.execute(nil, build_query(@operations))
    end
    render json: result
  end

  private

  def set_context
    @context = {
      current_user: current_user,
      current_request: request
    }
  end

  def set_operations
    if request.content_type != 'multipart/form-data'
      @operations = params[:_json] || params
      return
    end

    @operations = ApolloUploadServer::GraphQLDataBuilder.new.call(params)
    @operations.symbolize_keys!
  end

  def build_query(document)
    {
      query: document[:query],
      operation_name: document[:operationName],
      variables: ensure_hash(document[:variables]),
      context: @context
    }
  end

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash
      ambiguous_param
    when ActionController::Parameters
      ambiguous_param.permit!.to_h
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
