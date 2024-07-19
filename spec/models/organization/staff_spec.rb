require 'rails_helper'

RSpec.describe Organization::Staff do
  describe 'associations' do
    it 'belongs to an organization' do
      association = described_class.reflect_on_association(:organization)
      expect(association.macro).to eq(:belongs_to)
    end

    it 'belongs to a user' do
      association = described_class.reflect_on_association(:user)
      expect(association.macro).to eq(:belongs_to)
    end
  end

  describe 'table name' do
    it 'has the correct table name' do
      expect(described_class.table_name).to eq('organization_staff')
    end
  end
end
