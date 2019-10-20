// @flow
export const Types = {
  SEARCH_STATE_TOGGLE:"SEARCH_STATE_TOGGLE",
  SEARCH_MATCH: "SEARCH_MATCH",
  SEARCHED_FILES_COMPONENT: "SEARCHED_FILES_COMPONENT",
  CHANGE_ADDRESS: "CHANGE_ADDRESS",
  ADD_FILE_TO_RESULT_LIST: "ADD_FILE_TO_RESULT_LIST",
  ADD_FOLDER_TO_RESULT_LIST: "ADD_FOLDER_TO_RESULT_LIST",
  REFRESH_SEARCH_RESULTS: "REFRESH_SEARCH_RESULTS"
}

export function changeAddress(address) {
  return {
    type: Types.CHANGE_ADDRESS,
    payload: address
  };
}

export function changeSearchState(){
  return {
    type: Types.SEARCH_STATE_TOGGLE
  }
}

export function searchComponentToggle(){
  return {
    type: Types.SEARCHED_FILES_COMPONENT
  }
}


