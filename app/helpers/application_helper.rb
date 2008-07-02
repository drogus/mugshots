# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  # from Dan Webb's MinusMOR plugin
  def js(data)
    if data.respond_to? :to_json
      data.to_json
    else
      data.inspect.to_json
    end
  end
end
