require('../lib/extensions/Array')

test('Unique array of zeros', () => {
  expect([0, 0, 0].unique()).toEqual([0])
})

test('dotPaths have no effect when finding unique scalars in arrays', () => {
  expect([1, 1, 2].unique('field.nestedField.thisIsIgnored'))
    .toEqual([1, 1, 2].unique())
  expect(['a', 'a', 'b'].unique('2')).toEqual(['a', 'a', 'b'].unique())
})

test('Unique array of numbers', () => {
  expect([0, 1, 2, 3, 3, 3, 4].unique()).toEqual([0, 1, 2, 3, 4])
})

test('Unique arrays of nulls and undefineds', () => {
  expect([null, null, null].unique()).toEqual([null])
  expect([undefined, undefined].unique()).toEqual([undefined])
})

test('Unique arrays with nulls/undefineds and other values in them', () => {
  expect([null, 3, null].unique()).toEqual([null, 3])
  expect([undefined, undefined, 'a'].unique()).toEqual([undefined, 'a'])
  expect([undefined, {a: 1}, {a: 1}].unique('a')).toEqual([undefined, {a: 1}])
})

test('Unique array of strings', () => {
  expect(['a', 'a', 'a', 'b'].unique()).toEqual(['a', 'b'])
})

test('Unique array of objects', () => {
  expect([{a: 1}, {a: 2}, {a: 2}].unique('a')).toEqual([{a: 1}, {a: 2}])
})

test('Unique array of objects, based on multiple fields', () => {
  expect([
    {a: 1, b: 1},
    {a: 1, b: 1},
    {a: 1, b: 2},
    {a: 2, b: 2}
  ].unique(['a', 'b'])).toEqual([
    {a: 1, b: 1},
    {a: 1, b: 2},
    {a: 2, b: 2}
  ])
})

test('Unqiue array of arrays of objects', () => {
  expect([
    [{a: 1}, {b: 2}],
    [{a: 1}, {b: 2}],
    [{a: 2}, {b: 2}]
  ].unique(['0.a', '0.b'])).toEqual([
    [{a: 1}, {b: 2}],
    [{a: 2}, {b: 2}]
  ])
})
