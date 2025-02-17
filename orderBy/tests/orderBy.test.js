const orderBy = require('../src/orderBy.js');

describe('orderBy', () => {
  it('should order persons by name', () => {
    const persons = [{ name: 'Alex' }, { name: 'John' }];
    expect(orderBy(persons, ['name'])).toEqual(persons);
  });

  it('should order persons by age', () => {
    const persons = [
      { name: 'Alex', age: 12 },
      { name: 'John', age: 21 },
    ];
    expect(orderBy(persons, ['name'])).toEqual(persons.reverse());
  });

  it('should order persons by several props', () => {
    const persons = [
      { name: 'John', age: 21 },
      { name: 'Alex', age: 12 },
      { name: 'Alex', age: 5 },
    ];
    expect(orderBy(persons, ['name', 'age'])).toEqual([
      { name: 'Alex', age: 5 },
      { name: 'Alex', age: 12 },
      { name: 'John', age: 21 },
    ]);
  });

  it('shold throw incorrect array data error', () => {
    const persons = [{ name: 'Alex' }, 'Bob'];
    expect(() => {
      orderBy(persons, ['name']);
    }).toThrow('Array should contain only objects');
  });

  it('shold throw prop not found error', () => {
    const persons = [{ age: 12 }, { name: 'Bob', age: 12 }];
    expect(() => {
      orderBy(persons, ['name', 'age']);
    }).toThrow('Property "name" not found in object');
  });
});
