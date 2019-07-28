import { ViewState } from "./model/View";
import { Action } from "redux";
import produce from "immer";
import { State } from "../Reducer";

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
      const { views } = draftState;
      return draftState;
    },
  ),
});

export default viewReducer;
