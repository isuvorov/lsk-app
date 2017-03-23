Date.prototype.toHumanString = function toHumanString() {
  return [
    this.toISOString().substr(0, 10).split('-').reverse().join('.'),
    this.toISOString().substr(11, 8),
  ].join(' ');
};
Date.toHumanString = function toHumanString(date) {
  if (!date) return date;
  return new Date(date).toHumanString();
};
