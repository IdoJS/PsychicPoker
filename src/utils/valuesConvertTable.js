const valueMapping = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10
};

const backToCardValueMapping = {
  14: "A",
  13: "K",
  12: "Q",
  11: "J",
  10: "T",
  1: "A"
};

const getValue = card => {
  let value = card[0];
  return valueMapping[value] || value;
};

const getSuit = card => {
  return card[1];
};

const toFullCard = card => {
  let value = card[0];
  return (backToCardValueMapping[value] || value) + card[1];
};
export { getValue, getSuit, toFullCard };
