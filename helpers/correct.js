module.exports.correct = item => {
  item = item.replace(/(~|`|'|"|=)/g, "&prime;");
  return item;
};
