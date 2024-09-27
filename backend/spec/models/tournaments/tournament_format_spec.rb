require "rails_helper"

RSpec.describe Tournaments::TournamentFormat do
  describe "associations" do
    it { is_expected.to belong_to(:format).class_name("Tournaments::Format") }
    it { is_expected.to belong_to(:tournament).class_name("Tournaments::Tournament") }
  end
end
