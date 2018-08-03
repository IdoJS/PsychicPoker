const valueMapping = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  14: "A",
  13: "K",
  12: "Q",
  11: "J",
  10: "T"
};

const getValue = card => {
  let value = card[0];
  return valueMapping[value] || value;
};

export { getValue };
