#array of numbers, find which pair adds up to the sum

#1
def two_sum(nums, target)
  nums_map = Hash.new { |hash, key| hash[key] = [] }
  indices = nil

  nums.each_with_index do |n, idx|
    nums_map[n] << idx + 1
  end

  #nums_map: { 32 => [1, 4, 43] }
  nums_map.each do |key, idx_array|
    #key: 32
    #idx_array: [1,4,43]
    idx_array.each do |index|
      diff = target - key
      diff_index_array = nums_map[diff]
      if diff_index_array.length &&
        !(diff_index_array.length == 1 && diff_index_array[0] == index)
        secondary_index = diff_index_array.length == 1 ?
          diff_index_array[0] :
          diff_index_array[1]
        indices = [index, secondary_index]
        break
      end
    end
  end

  return indices.sort
end

#2
# node: @val, @next
def add_two_numbers(l1, l2)
  result_node = nil
  previous_node = nil
  carry_over = 0

  has_next_node = true
  while has_next_node

    l1_val = l1 ? l1.val : 0
    l2_val = l2 ? l2.val : 0
    sum = l1_val + l2_val + carry_over
    remainder = sum % 10
    carry_over = sum / 10

    node = ListNode.new(remainder)

    result_node ||= node
    previous_node.next = node if previous_node
    previous_node = node

    l1 = l1 && l1.next ? l1.next : nil
    l2 = l2 && l2.next ? l2.next : nil

    has_next_node = l1 || l2
    if !has_next_node && carry_over > 0
      previous_node.next = ListNode.new(carry_over)
    end
  end
  return result_node
end

#3
def longest_substring(s)
  best_str = ''
  longest_str = ''

  s.each_char do |char|
    idx = longest_str.index(char)
    if idx.nil?
      longest_str += char
    else
      best_str = longest_str if longest_str.length > best_str.length
      longest_str = longest_str[idx + 1..-1] + char
    end
  end
  best_str = longest_str if longest_str.length > best_str.length
  return best_str.length
end

#4
#def median(nums1, nums2)
#  length_1 = nums1.length
#  length_2 = nums2.length
#  total_length = length_1 + length_2 #odd means equal above and below, even means +1 |above - below|
#end

#5
def longest_palindrome(s)
  return s if s.length == 1
  previous = s[0]

  all_same = true
  z = 0
  counter = 0
  while z < s.length
    if s[z] == previous
      counter += 1
    else
      tmp_longest = previous * counter
      longest = tmp_longest if tmp_longest.length > longest.length
      previous = s[z]
      counter = 1
      break if counter > s.length / 2
    end
    z += 1
  end
  return previous * counter if all_same || counter > s.length / 2

  longest = ''
  i = 0
  while i < s.length
    starting_letter = s[i]
    matching_hash = {}
    matching_hash[i] = starting_letter

    j = i + 1
    while j < s.length
      if s[j] == starting_letter
        matching_hash[j] = s[j]
      end
      j += 1
    end

    i += 1

    indices = matching_hash.keys
    next if indices.length == 1
    next if (indices[-1] - indices[0]) < longest.length

    first_index = matching_hash.first[0]

    k = 0
    valid_sequence = true
    while k < (indices.length / 2 - 1)
      first_dist = indices[k + 1] - indices[k]
      second_dist = indices[indices.length - 1 - k] - indices[indices.length - 2 - k]
      if first_dist != second_dist
        valid_sequence = false
        break
      end
      k += 1
    end

    next if !valid_sequence

    matching_hash.delete_if {|key,v| (key != first_index) && (key - first_index < longest.length)}
    indices = matching_hash.keys

    n = 1
    last_index = indices[-1]
    running_str = ''
    while first_index + n < ((last_index - first_index) / 2)
      matching_hash.each do |key, v|
        if key == first_index
          running_str = matching_hash[key] << s[key + n]
        else
          checking_str = matching_hash[key] << s[key - n]
          matching_hash.delete(key) if checking_str != running_str
        end
      end
      n +=1
    end

    matching_hash.values.each do |value|
      longest = value if value.length > longest.length
    end
  end
  puts "longest: #{longest}"
  return longest
end
longest_palindrome('abb')
