class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :pronouns
end

class UserDetailSerializer < ActiveModel::Serializer
  attributes :id, :username, :pronouns
  attributes :email, :first_name, :last_name, :slug
end
