import { State } from "../../Reducer";
import { ViewBaseAction } from "./View";

export const SET_VIEW_NAME = "SET_VIEW_NAME";

export interface SetViewNameAction extends ViewBaseAction {
  name: string;
}

export const setViewName = (
  viewId: string,
  name: string,
): SetViewNameAction => ({
  name,
  type: SET_VIEW_NAME,
  viewId,
});

export const setViewNameReducer = (
  { views }: State,
  { name, viewId }: SetViewNameAction,
): void => {
  if (!views.orderSet.has(name)) {
    const view = views.dict[viewId];
    views.orderSet.delete(view.name);
    view.name = name;
  }
};
