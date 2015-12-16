cities = []
distances = {}
File.open('day_9.txt').each do |line|
  step_by_step = line.scan(/\w+/)

  pre_city_a = step_by_step[0]
  pre_city_b = step_by_step[2]
  city_a = pre_city_a < pre_city_b ? pre_city_a : pre_city_b
  city_b = pre_city_a < pre_city_b ? pre_city_b : pre_city_a

  distance = step_by_step[3]

  cities << city_a
  cities << city_b

  distances[city_a] ||= {}
  distances[city_a][city_b] = distance
  #puts line
end

cities.uniq!
possible_routes = cities.permutation(cities.length).to_a
shortest_distance = false
shortest_route = false
possible_routes.each do |route|
  dist = 0
  route.each_with_index do |city, index|
    if route[index + 1].nil?
      break
    end
    begin
      d = distances[city][route[index + 1]]
      if d
        dist += d.to_i
      else
        d = distances[route[index + 1]][city]
        dist += d.to_i
      end
    rescue NoMethodError => e
      d = distances[route[index + 1]][city]
      dist += d.to_i
    end
  end
  if shortest_distance == false
    shortest_route = route
    shortest_distance = dist
  else
    puts route if dist == 38
    if dist > shortest_distance
      shortest_route = route 
      shortest_distance = dist
    end
  end
end
#38 too low
#157 too low
#526 too high
p shortest_route
p shortest_distance
