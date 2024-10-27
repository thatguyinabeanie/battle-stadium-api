require "rails_helper"

RSpec.describe TournamentFormat do
  describe "associations" do
    it { is_expected.to belong_to(:format).class_name("Format") }
    it { is_expected.to belong_to(:tournament).class_name("Tournament") }
  end
end
