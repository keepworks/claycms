module Tokenable
  extend ActiveSupport::Concern

  class_methods do
    def has_token(prefix = nil, digest_attribute: nil, token_attribute: nil) # rubocop:disable Naming/PredicateName, Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
      prefix = "#{prefix}_" if prefix
      digest_attribute ||= "#{prefix}digest".to_sym
      token_attribute ||= "#{prefix}token".to_sym

      define_singleton_method("generate_#{digest_attribute}") do
        loop do
          # We use base58 instead of hex, keeping the behavior similar to has_secure_token.
          # However, this could be an issue if we ever shift from PostgreSQL to MySQL:
          # https://github.com/rails/rails/issues/20133
          digest = SecureRandom.base58(24)
          break digest unless exists?(digest_attribute => digest)
        end
      end

      define_singleton_method("find_with_#{token_attribute}") do |token|
        id, digest = Token.decode(token)
        return if !id || !digest

        record = find_by(id: id)
        return if !record

        record_digest = record.send(digest_attribute)
        return if !record_digest || !ActiveSupport::SecurityUtils.secure_compare(record_digest, digest)

        record
      end

      define_method(token_attribute) do
        digest = send(digest_attribute)
        Token.encode(id, digest) if digest.present?
      end
    end
  end
end
