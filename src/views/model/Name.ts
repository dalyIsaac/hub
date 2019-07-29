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
  views.dict[viewId].name = name;
};
