# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `omniauth-discord` gem.
# Please instead update this file by running `bin/tapioca gem omniauth-discord`.


# source://omniauth-discord//lib/omniauth/strategies/discord.rb#3
module OmniAuth
  class << self
    # source://omniauth/2.1.2/lib/omniauth.rb#134
    def config; end

    # source://omniauth/2.1.2/lib/omniauth.rb#138
    def configure; end

    # source://omniauth/2.1.2/lib/omniauth.rb#142
    def logger; end

    # source://omniauth/2.1.2/lib/omniauth.rb#146
    def mock_auth_for(provider); end

    # source://omniauth/2.1.2/lib/omniauth.rb#24
    def strategies; end
  end
end

# source://omniauth-discord//lib/omniauth/strategies/discord.rb#4
module OmniAuth::Strategies; end

# source://omniauth-discord//lib/omniauth/strategies/discord.rb#5
class OmniAuth::Strategies::Discord < ::OmniAuth::Strategies::OAuth2
  # source://omniauth-discord//lib/omniauth/strategies/discord.rb#42
  def authorize_params; end

  # source://omniauth-discord//lib/omniauth/strategies/discord.rb#37
  def callback_url; end

  # source://omniauth-discord//lib/omniauth/strategies/discord.rb#33
  def raw_info; end
end

# source://omniauth-discord//lib/omniauth/strategies/discord.rb#6
OmniAuth::Strategies::Discord::DEFAULT_SCOPE = T.let(T.unsafe(nil), String)

# source://omniauth-discord//lib/omniauth/discord/version.rb#1
module Omniauth; end

# source://omniauth-discord//lib/omniauth/discord/version.rb#2
module Omniauth::Discord; end

# source://omniauth-discord//lib/omniauth/discord/version.rb#3
Omniauth::Discord::VERSION = T.let(T.unsafe(nil), String)
