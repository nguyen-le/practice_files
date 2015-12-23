container = []
File.open('day_17.txt').each do |line|
  container << line.to_i
end

#count = 0
min_length = nil
result = []
(container.length + 1).times do |n|
  combos = container.combination(n).to_a
  combos.each do |combo|
    if combo.inject(:+) == 150
      result << combo
      min_length = combo.length
    end
  end
  break if !min_length.nil?
end
p min_length
p result
