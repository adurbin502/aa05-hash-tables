function anagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  const charSet = new Set();

  for (let char of str1) {
    charSet.add(char);
  }

  for (let char of str2) {
    if (!charSet.has(char)) {
      return false;
    }
  }
  return true;

}


function commonElements(arr1, arr2) {
  const commonInt = new Set();

  for (let num of arr1) {
    commonInt.add(num)
  }

  const res = [];

  for (let num of arr2) {
    if (commonInt.has(num)) {
      res.push(num)
    }
  }

  return res;

}


function duplicate(arr) {
  const duplicate = {};

  for (let num of arr) {
    if (duplicate[num]) {
      return num;
    } else {
      duplicate[num] = 1;
    }
  }
}


function twoSum(nums, target) {
//   const sum = new Set();

//   for (let num of nums) {
//     const complement = target - num;
//     if (sum.has(complement)) {
//       return true;
//     }
//     sum.add(num);
//   }
//   return false;
// }
  const seen = {};

  for (const num of nums) {
      const complement = target - num;
      if (seen[complement]) {
        return true;
      }
      seen[num] = true;
  }

  return false;
}


function wordPattern(pattern, strings) {
  const patternToStr = {};
  const strToPattern = {};

  if (pattern.length !== strings.length) return false;

  for ( let i = 0; i < pattern.length; i++) {
    let char = pattern[i];
    let word = strings[i];

    if (!patternToStr[char] && !strToPattern[word]) {
      patternToStr[char] = word;
      strToPattern[word] = char;
    } else {
      if (patternToStr[char] !== word || strToPattern[word] !== char) {
        return false;
      }
    }

  }
  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
