class Mugshot < ActiveRecord::Base
  
  has_attachment :content_type => :image, 
                 :storage => :file_system, 
                 :resize_to => '800>x600>',
                 :thumbnails => { :thumb => '100x100>' },
                 :max_size => 5.megabytes,
                 :min_size => 0

  validates_presence_of :size, :content_type, :filename, :message => Proc.new{ |mugshot| "can't be blank (#{mugshot.filename})" }
  validate  :attachment_attributes_valid?
  
  def attachment_attributes_valid?
    [:size, :content_type].each do |attr_name|
      enum = attachment_options[attr_name]
      errors.add attr_name, "#{ActiveRecord::Errors.default_error_messages[:inclusion]} (#{self.filename})" unless enum.nil? || enum.include?(send(attr_name))
    end
  end
  
  def self.handle_upload(mugshot_params)
    # array for not saved mugshots
    mugshots = []
    logger.info mugshot_params.inspect
    if mugshot_params[:uploaded_data].kind_of?(Array)
      mugshot_params[:uploaded_data].each do |p| 
        unless p.blank?
          mugshot = Mugshot.new(:uploaded_data => p)
          mugshots << mugshot unless mugshot.save
          logger.info mugshot.inspect
        end
      end
    else
      mugshot = Mugshot.new(mugshot_params)
      mugshots << mugshot unless mugshot.save
    end
    mugshots
  end
end