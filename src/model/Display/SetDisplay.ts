import { BaseAction } from "../../Common";
import { Display } from ".";
import { State } from "../../Reducer";

export const SET_DISPLAY_ACTION = "SET_DISPLAY_ACTION";

export interface SetDisplayAction extends BaseAction {
  display: Display;
}

export const setDisplay = (display: Display): SetDisplayAction => ({
  display,
  type: SET_DISPLAY_ACTION,
});

export const setDisplayReducer = (
  { display: displayState }: State,
  { display }: SetDisplayAction,
): void => {
  displayState.display = display;
};
