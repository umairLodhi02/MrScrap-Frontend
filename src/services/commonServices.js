export const getFirstLetter = (str) => {
  return str
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "");
};
