module Api
  class AutocompletesController < ApplicationController

    def index
      render json: MockLegsFinder.new(params[:type], params[:query], params[:scope]).results
    end
    
  end
end
