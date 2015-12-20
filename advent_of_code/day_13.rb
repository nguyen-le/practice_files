happiness_map = Hash.new {|h,k| h[k] = {}}
File.open('day_13.txt').each do |line|
  words = line.split(' ');
  person = words[0]
  change = words[2]
  points = words[3].to_i
  next_to = words[-1][0...-1]
  if change == 'lose'
    points *= -1
  end
  happiness_map[person][next_to] = points
end
people = happiness_map.keys
combinations = 1
people << 'you'
people.length.times do |n|
  combinations *= n if n != 0
end

total_happiness = 0
combos = people.permutation(people.length).to_a[0...combinations]
combos.each do |combo|
  happiness = 0
  combo.each_with_index do |person, idx|
    happiness += happiness_map[person][combo[(idx + 1) % combo.length]].to_i
    happiness += happiness_map[person][combo[(idx - 1) % combo.length]].to_i
  end
  total_happiness = happiness if happiness > total_happiness
end
puts total_happiness
# 621 too low
