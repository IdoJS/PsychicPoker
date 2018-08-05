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
        : replaceFromDeck.concat(combinationsArray[i]);

    if (searchList.length === 5) {
      let newResultObject = callBackToCheckRules(searchList);
      if (callBackToCheckBetterResult(newResultObject, resultObject)) {
        resultObject = newResultObject;
      }
    }
  }

  return resultObject;
};

export { combineGenerator, combineSearch };
