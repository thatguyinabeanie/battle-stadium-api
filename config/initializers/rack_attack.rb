Rack::Attack.throttle('requests per IP', limit: 100, period: 1.minute) do |request|
  request.ip
end
