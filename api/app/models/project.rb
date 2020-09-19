class Project < ApplicationRecord
  include Uid

  belongs_to :team

  has_many :assets, dependent: :destroy
  has_many :entities, dependent: :destroy
  has_many :exports, dependent: :destroy
  has_many :key_pairs, dependent: :destroy
  has_many :locales, dependent: :destroy
  has_many :restores, dependent: :destroy
  has_many :resources, dependent: :destroy

  validates :name, presence: true
  validates :uid, uniqueness: true
end
