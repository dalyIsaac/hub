import { State } from "../../Reducer";
import { ViewBaseAction } from "./View";
import { sortItems } from "../../Order";

export const APPEND_SUBJECT_TO_VIEW = "APPEND_SUBJECT_TO_VIEW";

export interface AppendSubjectToViewAction extends ViewBaseAction {
  subjectId: string;
}

export const appendSubjectToView = (
  viewId: string,
  subjectId: string,
): AppendSubjectToViewAction => ({
  subjectId,
  type: APPEND_SUBJECT_TO_VIEW,
  viewId,
});

export const appendSubjectToViewReducer = (
  { subjects, views }: State,
  { subjectId, viewId }: AppendSubjectToViewAction,
): void => {
  const children = views.dict[viewId].children;
  children.order.push(subjectId);
  views.dict[viewId].children.order = sortItems(subjects.dict, children);
};
