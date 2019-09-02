// @flow
export function changeAddress(address) {
  return {
    type: 'CHANGE_ADDRESS',
    payload: address
  };
}
