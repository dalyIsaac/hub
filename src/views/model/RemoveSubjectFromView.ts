import { State } from "../../Reducer";
import { ViewBaseAction } from "./View";
import { remove } from "lodash";

export const REMOVE_SUBJECT_FROM_VIEW = "REMOVE_SUBJECT_FROM_VIEW";

export interface RemoveSubjectFromViewAction extends ViewBaseAction {
  subjectId: string;
}

export const removeSubjectFromView = (
  viewId: string,
  subjectId: string,
): RemoveSubjectFromViewAction => ({
  subjectId,
  type: REMOVE_SUBJECT_FROM_VIEW,
  viewId,
});

export const removeSubjectFromViewReducer = (
  { views }: State,
  { subjectId, viewId }: RemoveSubjectFromViewAction,
): void => {
  const view = views.dict[viewId];
  remove(view.children.order, (v): boolean => v === subjectId);
};
