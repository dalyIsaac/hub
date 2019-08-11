import { State } from "../../Reducer";
import { ViewBaseAction } from ".";
import { remove } from "lodash";
import { sortAllViews } from "../Order";

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
  state: State,
  { subjectId, viewId }: RemoveSubjectFromViewAction,
): void => {
  const { views } = state;
  const view = views.dict[viewId];
  remove(view.children.order, (v): boolean => v === subjectId);
  sortAllViews(state, subjectId);
};
