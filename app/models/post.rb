class Post < ApplicationRecord
  has_many :comments
  has_many_attached :images

  validates :title,  presence: true
  validates :content, presence: true
end
