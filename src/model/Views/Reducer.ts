import {
  APPEND_SUBJECT_TO_VIEW,
  AppendSubjectToViewAction,
  appendSubjectToViewReducer,
} from "./AppendSubjectToView";
import { CREATE_VIEW, CreateViewAction, createViewReducer } from "./CreateView";
import {
  REMOVE_SUBJECT_FROM_VIEW,
  RemoveSubjectFromViewAction,
  removeSubjectFromViewReducer,
} from "./RemoveSubjectFromView";
import {
  SET_VIEW_NAME,
  SetViewNameAction,
  setViewNameReducer,
} from "./SetViewName";

import { Action } from "redux";
import { State } from "../../Reducer";
import { ViewState } from ".";
import produce from "immer";

export const initialViewState = (): ViewState => ({
  dict: {},
  order: [],
  orderSet: new Set(),
});

// TODO: check if https://github.com/rt2zz/redux-persist/pull/915 is
// distributed. The spread is used since for some reason the NPM package doesn't
// contain the spread from the pull request.
const viewReducer = (state: State, action: Action): State => ({
  ...produce(
    state,
    (draftState): State => {
      // Reinitializes views state, if redux-persist removes it
      if (!state.views.dict) {
        state.views = initialViewState();
      }

      switch (action.type) {
        case CREATE_VIEW:
          createViewReducer(draftState, action as CreateViewAction);
          break;
        case SET_VIEW_NAME:
          setViewNameReducer(draftState, action as SetViewNameAction);
          break;
        case APPEND_SUBJECT_TO_VIEW:
          appendSubjectToViewReducer(
            draftState,
            action as AppendSubjectToViewAction,
          );
          break;
        case REMOVE_SUBJECT_FROM_VIEW:
          removeSubjectFromViewReducer(
            draftState,
            action as RemoveSubjectFromViewAction,
          );
          break;
        default:
          break;
      }
      return draftState;
    },
  ),
});

export default viewReducer;
