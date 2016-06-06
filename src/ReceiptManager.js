'use strict';

// export function validate(receipt) {
//   const promise = new Parse.Promise();
//   console.log('validateReceipt')
//   promise.resolve();
//   return promise;
// }

export function create(receipt) {
  const promise = new Parse.Promise();
  console.log('createReceipt')
  promise.resolve(receipt);
  return promise;
}
