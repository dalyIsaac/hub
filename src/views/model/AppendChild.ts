import { ViewBaseAction } from "./View";
import { State } from "../../Reducer";
import { sortItems } from "../../Order";

export const APPEND_CHILD_VIEW = "APPEND_CHILD_VIEW";

export interface AppendChildViewAction extends ViewBaseAction {
  subjectId: string;
}

export const appendChildView = (
  viewId: string,
  subjectId: string,
): AppendChildViewAction => ({
  subjectId,
  type: APPEND_CHILD_VIEW,
  viewId,
});

export const appendChildViewReducer = (
  { subjects, views }: State,
  { subjectId, viewId }: AppendChildViewAction,
): void => {
  const children = views.dict[viewId].children;
  children.order.push(subjectId);
  views.dict[viewId].children.order = sortItems(subjects.dict, children);
};
