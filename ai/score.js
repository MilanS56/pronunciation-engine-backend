module.exports = function score(comp) {
  const correct = comp.filter(p => p.match).length;
  return Math.round((correct / comp.length) * 100);
};
