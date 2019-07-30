import { ViewBaseAction } from "./View";
import { State } from "../../Reducer";

export const UPDATE_VIEW_NAME = "UPDATE_VIEW_NAME";

export interface UpdateViewNameAction extends ViewBaseAction {
  name: string;
}

export const updateViewName = (
  viewId: string,
  name: string,
): UpdateViewNameAction => ({
  name,
  type: UPDATE_VIEW_NAME,
  viewId,
});

export const updateViewNameReducer = (
  { views }: State,
  { name, viewId }: UpdateViewNameAction,
): void => {
  if (!views.orderSet.has(name)) {
    const view = views.dict[viewId];
    views.orderSet.delete(view.name);
    view.name = name;
  }
};
