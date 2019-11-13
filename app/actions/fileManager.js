// @flow
export const Types = {
  SEARCH_STATE_TOGGLE: 'SEARCH_STATE_TOGGLE',
  SEARCH_MATCH: 'SEARCH_MATCH',
  SEARCHED_FILES_COMPONENT: 'SEARCHED_FILES_COMPONENT',
  CHANGE_ADDRESS: 'CHANGE_ADDRESS',
  ADD_FILE_TO_RESULT_LIST: 'ADD_FILE_TO_RESULT_LIST',
  ADD_FOLDER_TO_RESULT_LIST: 'ADD_FOLDER_TO_RESULT_LIST',
  REFRESH_SEARCH_RESULTS: 'REFRESH_SEARCH_RESULTS',
  NAVIGATE_ADDRESS: 'NAVIGATE_ADDRESS',
  FILES_TO_COPY: 'FILES_TO_COPY',
  FILES_TO_CUT: 'FILES_TO_CUT'
};

export function changeAddress(address: String) {
  return {
    type: Types.CHANGE_ADDRESS,
    payload: address
  };
}

export function navigateAddress(toAddress: String) {
  return {
    type: Types.NAVIGATE_ADDRESS,
    payload: toAddress
  };
}

export function filesToCopy(files: String[]) {
  return {
    type: Types.FILES_TO_COPY,
    payload: files
  };
}

export function filesToCut(files: String[]) {
  return {
    type: Types.FILES_TO_CUT,
    payload: files
  };
}

export function changeSearchState() {
  return {
    type: Types.SEARCH_STATE_TOGGLE
  };
}

export function searchComponentToggle() {
  return {
    type: Types.SEARCHED_FILES_COMPONENT
  };
}
