import { ViewState } from "./model/View";
import { Action } from "redux";
import produce from "immer";
import { State } from "../Reducer";

export const initialViewState = (): ViewState => ({
  dict: {},
  order: [],
});

const viewReducer = (state: State, action: Action): State =>
  produce(
    state,
    (draftState): State => {
      const { views } = draftState;
      return draftState;
    },
  );

export default viewReducer;
