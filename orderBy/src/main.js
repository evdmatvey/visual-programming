const orderBy = require('./orderBy');

console.log(orderBy([{ age: 12 }, { name: 'Bob', age: 12 }], ['name', 'age']));
