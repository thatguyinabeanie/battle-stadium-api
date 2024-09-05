require "faker"
require "rails_helper"

RSpec.describe SecurePassword do
  describe ".generate_secure_password" do
    it "generates a secure password" do
      password = described_class.generate_secure_password
      expect(described_class.complexity_check(password)).to be true
    end

    it "generates a secure password with custom max length" do
      max_length = 20
      password = described_class.generate_secure_password(max_length:)
      expect(password.length).to be <= max_length
    end

    it "raises an error if max length is less than 8" do
      max_length = 6
      expect { described_class.generate_secure_password(max_length:) }
        .to raise_error(ArgumentError, "max_length must be at least 8")
    end
  end

  describe ".complexity_check" do
    it "returns true for a complex password" do
      expect(described_class.complexity_check("Abc123!@#")).to be true
    end

    it "returns false for a password without lowercase characters" do
      expect(described_class.complexity_check("ABC123!@#")).to be false
    end

    it "returns false for a password without uppercase characters" do
      expect(described_class.complexity_check("abc123!@#")).to be false
    end

    it "returns false for a password without digits" do
      expect(described_class.complexity_check("Abcdef!@#")).to be false
    end

    it "returns false for a password without special characters" do
      expect(described_class.complexity_check("Abc123456")).to be false
    end

    it "returns false for a password with insufficient length" do
      expect(described_class.complexity_check("Abc123!")).to be false
    end
  end

  describe ".lowercase?" do
    it "returns true for a password with lowercase characters" do
      expect(described_class.lowercase?("abc123!@#")).to be true
    end

    it "returns false for a password without lowercase characters" do
      expect(described_class.lowercase?("ABC123!@#")).to be false
    end
  end

  describe ".uppercase?" do
    it "returns true for a password with uppercase characters" do
      expect(described_class.uppercase?("ABC123!@#")).to be true
    end

    it "returns false for a password without uppercase characters" do
      expect(described_class.uppercase?("abc123!@#")).to be false
    end
  end

  describe ".digit?" do
    it "returns true for a password with digits" do
      expect(described_class.digit?("Abc123!@#")).to be true
    end

    it "returns false for a password without digits" do
      expect(described_class.digit?("Abcdef!@#")).to be false
    end
  end

  describe ".special_char?" do
    it "returns true for a password with special characters" do
      expect(described_class.special_char?("Abc123!@#")).to be true
    end

    it "returns false for a password without special characters" do
      expect(described_class.special_char?("Abc123456")).to be false
    end
  end

  describe ".required_length?" do
    it "returns true for a password with required length" do
      expect(described_class.required_length?("Abc123!@#")).to be true
    end

    it "returns false for a password with insufficient length" do
      expect(described_class.required_length?("Abc123!")).to be false
    end
  end
end
