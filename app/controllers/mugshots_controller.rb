class MugshotsController < ApplicationController
  
  before_filter :get_main_javascript_file
  
  def new
    @mugshot = Mugshot.new
  end

  def create
    logger.info "aaaaaaaa"
    @mugshots = Mugshot.handle_upload(params[:mugshot])
      
    # if @mugshots is empty there are no errors
    if @mugshots.blank?
      flash[:notice] = 'Mugshot was successfully created.'
      redirect_to mugshots_url(@main_js)
    else
      render :action => :new
    end
  end
  
  def index
    @mugshots = Mugshot.find(:all, :conditions => {:parent_id => nil})
    respond_to do |format|
      format.html
      format.js { render :layout => false }
    end
  end
	  
private
  def get_main_javascript_file
    @main_js = if params[:javascript_file]
      params[:javascript_file]
    else
      "application"
    end
  end
end
