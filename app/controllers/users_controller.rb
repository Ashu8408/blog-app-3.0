class UsersController < ApplicationController
  
  def index
    @user = User.new
    @user.contacts.build if @user.contacts.blank?
    @user.addresses.build if @user.addresses.blank?
    respond_to do |format|
      format.html { render "explore/index" }
    end
  end
  
  def new
    @user = User.new
    @user.contacts.build if @user.contacts.blank?
    @user.addresses.build if @user.addresses.blank?
    @user.contacts.build  # Ensure at least one contact field appears
    @user.addresses.build  # Ensure at least one address field appears
  end

  def edit
    @user = User.find(params[:id])
    # @user.contacts.build if @user.contacts.empty?  # Ensure at least one contact is available
    # @user.addresses.build if @user.addresses.empty?
  end

  def create
    @user = User.new(user_params)
    @user.contacts.build if @user.contacts.blank?
    @user.addresses.build if @user.addresses.blank?
  
    if @user.save
      redirect_to @user, notice: 'User was successfully created.'
    else
      puts @user.errors.full_messages # Debugging
      flash[:alert] = @user.errors.full_messages.join(", ")
      render :new
    end
  end
  
  def update
    @user = User.find(params[:id])
  
    if @user.update(user_params)
      redirect_to @user, notice: 'User was successfully updated.'
    else
      puts @user.errors.full_messages # Debugging
      flash[:alert] = @user.errors.full_messages.join(", ")
      render :edit
    end
  end
  

  private

  def user_params
    params.require(:user).permit( :email, :password, :password_confirmation,
    contacts_attributes: [:id, :mobile, :others, :_destroy],
    addresses_attributes: [:id, :address_line_1, :address_line_2, :pin_code, :city, :country, :_destroy ])
  end

end
