# increment last letter until z then rollover
# look for: 3 letter straights, 2 pairs, and no i,o,l
input = 'vzbxkghb';
alphabet = {};
alphabet_str = 'abcdefghijklmnopqrstuvwxyz';
alphabet_str.each_char do |char|
  alphabet[char] = alphabet_str.index(char)
end

def increment_pw(pw, alphabet_str, alphabet)
  last_letter = pw[-1]
  inc = 1;
  if 'hkn'.include?(last_letter)
    inc = 2
  end
  idx = alphabet[last_letter]

  translate = idx + inc
  if translate > 25
    result = increment_pw(pw[0..-2], alphabet_str, alphabet) + alphabet_str[translate % 26]
  else
    result = pw[0..-2] + alphabet_str[translate % 26]
  end
  return result
end

def is_valid_pw?(pw)
  is_valid = false;
  if has_no_bad_letters?(pw) && has_straight?(pw) && has_two_pairs?(pw)
    is_valid = true;
  end
  return is_valid
end

def has_no_bad_letters?(pw)
  no_bad_letter = true
  pw.each_char do |char|
    no_bad_letter = false if 'ilo'.include?(char)
  end
  return no_bad_letter
end

def has_straight?(pw)
  alphabet_str = 'abcdefghijklmnopqrstuvwxyz';
  straight_count = 0
  previous_letter = '';
  pw.each_char do |c|
    if previous_letter != '' &&
        alphabet_str.index(c) - alphabet_str.index(previous_letter) == 1
      straight_count += 1
    else
      straight_count = 0
    end
    previous_letter = c
    break if straight_count == 2
  end
  return straight_count >= 2
end

def has_two_pairs?(pw)
  pairs = 0
  two_letters_back = ''
  previous_letter = ''
  pw.each_char do |char|
    pairs += 1 if char == previous_letter && previous_letter != two_letters_back
    two_letters_back = previous_letter
    previous_letter = char
  end

  return pairs >= 2
end

def part_one(pw, alphabet_str, alphabet)
  until is_valid_pw?(pw)
    pw = increment_pw(pw, alphabet_str, alphabet)
  end
  puts pw
end

def part_two(pw, alphabet_str, alphabet)
  valid_pw = 0
  until valid_pw == 2
    pw = increment_pw(pw, alphabet_str, alphabet)
    valid_pw += 1 if is_valid_pw?(pw)
  end
  puts pw
end

#input = 'ghijklmn'
#input = 'abcdefgh'
#part_one(input, alphabet_str, alphabet)
part_two(input, alphabet_str, alphabet)
