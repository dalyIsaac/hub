import { State } from "../../Reducer";
import { BaseAction } from "../../Common";
import produce from "immer";
import {
  SET_DISPLAY_ACTION,
  setDisplayReducer,
  SetDisplayAction,
} from "./SetDisplay";
import { DisplayState } from ".";

export const initialDisplayState = (): DisplayState => ({
  display: "grid",
});

const displayReducer = (state: State, action: BaseAction) => ({
  ...produce(
    state,
    (draftState): State => {
      switch (action.type) {
        case SET_DISPLAY_ACTION:
          setDisplayReducer(draftState, action as SetDisplayAction);
          break;
      }
      return draftState;
    },
  ),
});

export default displayReducer;
