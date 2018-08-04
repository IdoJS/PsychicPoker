import constants from "./constants";

const compareByHand = (hand1, hand2, type) => {
  let result;
  switch (type) {
    case constants.HAND_TYPE.HIGH_CARD:
      break;
    case constants.HAND_TYPE.ONE_PAIR:
      break;
    case constants.HAND_TYPE.TWO_PAIR:
      break;
    case constants.HAND_TYPE.THREE:
      break;
    case constants.HAND_TYPE.STRAIGHT:
      break;
    case constants.HAND_TYPE.FLUSH:
      break;
    case constants.HAND_TYPE.FULL_HOUSE:
      break;
    case constants.HAND_TYPE.FOUR:
      break;
    case constants.HAND_TYPE.STRAIGHT_FLUSH:
      break;
  }
  return result;
};

const compareByRank = (rank, hand1, hand2) => {
  let type = constants.RANK[rank];
  return compareByHand(type, hand1, hand2);
};
export { compareByHand, compareByRank };
