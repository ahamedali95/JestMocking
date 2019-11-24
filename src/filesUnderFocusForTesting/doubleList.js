const doubleList = (array, callback) => {
  if (!array.length) return [];

  return array.map(callback);
}

const callback = num => num *= 2;

module.exports = {
  doubleList,
  callback
};