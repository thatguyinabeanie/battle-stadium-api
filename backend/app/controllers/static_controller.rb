class StaticController < ApplicationController
  def index
    render file: Rails.public_path.join("index.html")
  end
end
