# typescript-examples

## Repository Goals

Provide practical Typescript examples, in the form of three components:

1. Typescript source code files encoding some business logic. E.g., a class for modeling persons, [`Person.Model`](https://github.com/joeldalley/typescript-examples/blob/master/src/lib/model/Person.ts).

2. One or more tests that exercise the files from (1). E.g., [this test file for the Person class](https://github.com/joeldalley/typescript-examples/blob/master/src/examples/person.test.ts).

3. Discussion of design goals and motivation, as well as detailed discussion of the elements of code found in a given example. E.g.,  the [Person class README file](https://github.com/joeldalley/typescript-examples/blob/master/src/lib/model/README.Person.md)

## Get Started

```sh
git clone git@github.com:joeldalley/typescript-examples.git
cd typescript-examples && npm install && npm run build && npm run test
```

#### Developer workflow

After installing, a nice workflow is to execute `npm run watch` in a terminal, which will incrementally compile your source code changes into the `artifacts` directory.

You should then be able to execute `npm run test` on the updated files in `artifacts`, without needing to re-compile all your TS files.

## Person :: a Typescript namespace

 * [README -- Design goals & code discussion](https://github.com/joeldalley/typescript-examples/blob/master/src/lib/model/README.Person.md)<br/>
 * [Person.ts -- class definition](https://github.com/joeldalley/typescript-examples/blob/master/src/lib/model/Person.ts)<br/>
 * [person.test.ts -- test usage of the Person class](https://github.com/joeldalley/typescript-examples/blob/master/src/examples/person.test.ts)

## Crowd :: a Typescript namespace

 * [README -- Design goals & code discussion](https://github.com/joeldalley/typescript-examples/blob/master/src/lib/model/README.Crowd.md)<br/>
 * [Crowd.ts -- class definition](https://github.com/joeldalley/typescript-examples/blob/master/src/lib/model/Crowd.ts)<br/>
 * [crowd.test.ts -- test usage of the Crowd](https://github.com/joeldalley/typescript-examples/blob/master/src/examples/crowd.test.ts)
