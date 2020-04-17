class XtransportsController < ApplicationController

  def index
    @routes = JSON.parse(File.read('db/gist.json'))['features']
  end

end
