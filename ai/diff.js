module.exports = function diff(user, correct) {
  return correct.map((p, i) => ({
    expected: p,
    said: user[i] || "—",
    match: user[i] === p
  }));
};
