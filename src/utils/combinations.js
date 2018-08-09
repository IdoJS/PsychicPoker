const combineGenerator = (a, min) => {
  var fn = function(n, src, got, all) {
    if (n === 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  var all = [];
  for (var i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
};

const combineSearch = (
  resultObject,
  userCards,
  replaceFromDeck,
  replaceFromDeckLength,
  callBackToCheckRules,
  callBackToCheckBetterResult
) => {
  let combinationsArray = combineGenerator(
    userCards,
    5 - replaceFromDeckLength
  );
  // builc array size 5 with cards from the replacmentDeck and the additional cards from user
  for (let i = 0; i < combinationsArray.length; i++) {
    let additionalCards = combinationsArray[i];

    let searchList =
      additionalCards === undefined
        ? replaceFromDeck
        : replaceFromDeck.concat();

    if (searchList.length === 5) {
      let newResultObject = callBackToCheckRules(searchList);
      if (callBackToCheckBetterResult(newResultObject, resultObject)) {
        resultObject = newResultObject;
      }
    }
  }

  return resultObject;
};

const allSubArrayBySize = (accumulator, currentValue, currentIndex, cards) => {
  !accumulator[currentValue.length]
    ? (accumulator[currentValue.length] = [currentValue])
    : accumulator[currentValue.length].push(currentValue);

  return accumulator;
};

const getSubArrayBySize = array => {
  // 1. get all subArrays
  let subArrays = combineGenerator(array, 0);
  // 2. arrange sub array by size
  return subArrays.reduce(allSubArrayBySize, { 0: [[]] });
};

// iterate on the array and return object with all sub arrays arrange by size
const asyncGetAllPossibleSubArrayFromHand = array => {
  return new Promise(resolve => {
    let data = getSubArrayBySize(array);
    resolve(data);
  });
};

export { combineGenerator, combineSearch, asyncGetAllPossibleSubArrayFromHand };
