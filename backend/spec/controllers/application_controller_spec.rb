require 'rails_helper'

class TestClass < ApplicationController
  def request
  end
end

RSpec.describe ApplicationController, type: :controller do


  describe '#authenticate_user' do
    it 'should authenticate the user' do

    end

    it 'should handle invalid or expired session' do
      # Add your test code here
    end
  end

  describe '#current_user' do
    it 'should return the current user' do
      # Add your test code here
    end
  end

  describe '#pundit_user' do
    it 'should return the pundit user' do
      # Add your test code here
    end
  end
end
