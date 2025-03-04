class Address < ApplicationRecord
  belongs_to :user
  validates :address_line_1, :pin_code, :city, :country, presence: true
end
