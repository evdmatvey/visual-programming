function orderBy(arr, props) {
  if (!arr.every((item) => typeof item === 'object'))
    throw new Error('Array should contain only objects');

  return arr.sort((a, b) => {
    for (const prop of props) {
      if (!(prop in a || prop in b))
        throw new Error(`Property "${prop}" not found in object`);

      return a[prop] < b[prop] ? -1 : 1;
    }

    return 0;
  });
}

module.exports = orderBy;
