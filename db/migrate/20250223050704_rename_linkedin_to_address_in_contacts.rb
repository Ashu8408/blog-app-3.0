class RenameLinkedinToAddressInContacts < ActiveRecord::Migration[8.0]
  def change
    rename_column :contacts, :linkedin, :address
  end
end
