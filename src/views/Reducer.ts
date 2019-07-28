import { ViewState } from "./model/View";
import { Action } from "redux";
import produce from "immer";
import { State } from "../Reducer";
import { createViewReducer, CREATE_VIEW } from "./model/Create";

export const initialViewState = (): ViewState => ({
  dict: {},
  order: [],
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
          createViewReducer(draftState);
          break;

        default:
          break;
      }
      return draftState;
    },
  ),
});

export default viewReducer;
