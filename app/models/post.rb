class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many_attached :images
  has_rich_text :body

  validates :title,  presence: true
  validates :content, presence: true
end
