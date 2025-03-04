class Contact < ApplicationRecord
  belongs_to :user
  validates :mobile, presence: true
end
