import { ViewState } from "./model/View";
import { Action } from "redux";
import produce from "immer";
import { State } from "../Reducer";
import {
  createViewReducer,
  CREATE_VIEW,
  CreateViewAction,
} from "./model/Create";
import {
  UPDATE_VIEW_NAME,
  updateViewNameReducer,
  UpdateViewNameAction,
} from "./model/Name";
import {
  AppendChildViewAction,
  APPEND_CHILD_VIEW,
  appendChildViewReducer,
} from "./model/AppendChild";
import {
  REMOVE_CHILD_VIEW,
  RemoveChildViewAction,
  removeChildViewReducer,
} from "./model/RemoveChild";

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
        case UPDATE_VIEW_NAME:
          updateViewNameReducer(draftState, action as UpdateViewNameAction);
          break;
        case APPEND_CHILD_VIEW:
          appendChildViewReducer(draftState, action as AppendChildViewAction);
          break;
        case REMOVE_CHILD_VIEW:
          removeChildViewReducer(draftState, action as RemoveChildViewAction);
          break;
        default:
          break;
      }
      return draftState;
    },
  ),
});

export default viewReducer;
