class RenameVerificationTokensToVerificationToken < ActiveRecord::Migration[7.1]
  def change
    rename_table :verification_tokens, :verification_token
  end
end
