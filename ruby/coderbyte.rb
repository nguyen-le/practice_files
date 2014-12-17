def additivePersistence(num)
  count = 0
  sum = num
  while sum > 9
    sum = 0
    num_str_array = num.to_s.split("")
    num_str_array.each do |n|
      sum += n.to_i
    end
    num = sum
    count += 1
  end
  return count
end

def MultipleBrackets(str)
  openers = ["(","["]
  closers = [")", "]"]
  b = []
  matching = 1
  count = 0
  str.each_char do |c|
    if openers.include? c
      b.push c
    elsif closers.include? c
      return 0 if b.length == 0
      index_opener = openers.index b.pop
      index_closer = closers.index c
      if index_opener == index_closer
        count += 1
      else
        return 0
      end
    end
  end
  return "0" if b.length > 0
  return "1" if count == 0
  "#{matching} #{count}"
end

MultipleBrackets("coder(b)(y)(t)([e))")
