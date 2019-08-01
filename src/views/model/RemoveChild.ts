import { ViewBaseAction } from "./View";
import { State } from "../../Reducer";
import { remove } from "lodash";

export const REMOVE_CHILD_VIEW = "REMOVE_CHILD_VIEW";

export interface RemoveChildViewAction extends ViewBaseAction {
  subjectId: string;
}

export const removeChildView = (
  viewId: string,
  subjectId: string,
): RemoveChildViewAction => ({
  subjectId,
  type: REMOVE_CHILD_VIEW,
  viewId,
});

export const removeChildViewReducer = (
  { views }: State,
  { subjectId, viewId }: RemoveChildViewAction,
): void => {
  const view = views.dict[viewId];
  remove(view.children.order, (v): boolean => v === subjectId);
};
