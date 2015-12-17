# increment last letter until z then rollover
# look for: 3 letter straights, 2 pairs, and no i,o,l
input = 'vzbxkghb';
alphabet = {};
alphabet_str = 'abcdefghijklmnopqrstuvwxyz';
alphabet_str.each_char do |char|
  alphabet[char] = alphabet_str.index(char)
end

def increment_pw(pw)
  last_letter = pw[-1]
  alphabet[last_letter]
end

def is_valid_pw?(pw)
  is_valid = false;
  if has_no_bad_letters?(pw) && has_straight?(pw) && has_two_pairs?(pw)
    is_valid = true;
  end
  return is_valid
end

puts alphabet
increment_pw(input)
