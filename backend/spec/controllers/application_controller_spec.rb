require 'rails_helper'

class TestClass < ApplicationController
  def request; end
end

RSpec.describe ApplicationController do
  describe '#authenticate_user' do
    it 'authenticates the user' do
    end

    it 'handles invalid or expired session' do
      # Add your test code here
    end
  end

  describe '#current_user' do
    it 'returns the current user' do
      # Add your test code here
    end
  end

  describe '#pundit_user' do
    it 'returns the pundit user' do
      # Add your test code here
    end
  end
end
