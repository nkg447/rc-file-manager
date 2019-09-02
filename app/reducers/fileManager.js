import { changeAddress } from '../actions/fileManager';
import cloneDeep from 'lodash/cloneDeep';
import os from 'os';

const initialState = {
  address: os.homedir(),
  home: os.homedir()
};

export default function fileManager(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_ADDRESS': {
      const newState = cloneDeep(state);
      newState.address = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
