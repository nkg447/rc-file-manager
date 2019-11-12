import { changeAddress, Types } from '../actions/fileManager';
import cloneDeep from 'lodash/cloneDeep';
import os from 'os';

const initialState = {
  address: os.homedir(),
  home: os.homedir(),
  navigationStack: [os.homedir()],
  currentStackIndex: 0,
  searching: false,
  searchResultsList: {
    folders: [],
    files: []
  },
  searchComponent: false
};

export default function fileManager(state = initialState, action) {
  switch (action.type) {
    case Types.CHANGE_ADDRESS: {
      const newState = cloneDeep(state);
      newState.navigationStack = newState.navigationStack.slice(
        0,
        newState.currentStackIndex + 1
      );
      newState.navigationStack.push(action.payload);
      newState.currentStackIndex++;
      newState.address = newState.navigationStack[newState.currentStackIndex];
      return newState;
    }

    case Types.NAVIGATE_ADDRESS: {
      const newState = cloneDeep(state);
      if (action.payload === 'prev' && newState.currentStackIndex > 0) {
        newState.currentStackIndex--;
      } else if (
        action.payload === 'next' &&
        newState.navigationStack.length > newState.currentStackIndex + 1
      ) {
        newState.currentStackIndex++;
      }
      newState.address = newState.navigationStack[newState.currentStackIndex];
      return newState;
    }

    case Types.SEARCH_STATE_TOGGLE: {
      const newState = cloneDeep(state);
      newState.searching = !newState.searching;
      return newState;
    }

    case Types.CHANGE_ADDRESS: {
      const newState = cloneDeep(state);
      newState.searchComponent = !newState.searchComponent;
      return newState;
    }

    case Types.ADD_FILE_TO_RESULT_LIST: {
      const file = action.payload;
      const newState = cloneDeep(state);
      newState.searchResultsList.files.push(file);
      return newState;
    }

    case Types.ADD_FOLDER_TO_RESULT_LIST: {
      const folder = action.payload;
      const newState = cloneDeep(state);
      newState.searchResultsList.folders.push(folder);
      return newState;
    }

    case Types.REFRESH_SEARCH_RESULTS: {
      const newState = cloneDeep(state);
      newState.searchResultsList = {
        files: [],
        folders: []
      };
      return newState;
    }

    default:
      return state;
  }
}
