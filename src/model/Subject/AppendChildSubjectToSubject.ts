import { SubjectBaseAction } from ".";

import { sortItems, sortAllViews } from "../Order";
import { State } from "../../Reducer";

export const APPEND_CHILD_SUBJECT_TO_SUBJECT =
  "APPEND_CHILD_SUBJECT_TO_SUBJECT";

export interface AppendChildSubjectToSubjectAction extends SubjectBaseAction {
  child: string;
}

export const appendChildSubjectToSubject = (
  subjectId: string,
  child: string,
): AppendChildSubjectToSubjectAction => ({
  child,
  subjectId,
  type: APPEND_CHILD_SUBJECT_TO_SUBJECT,
});

export const appendChildSubjectToSubjectReducer = (
  state: State,
  { subjectId, child }: AppendChildSubjectToSubjectAction,
): void => {
  const { subjects } = state;
  const parentOrder = subjects.dict[subjectId].children;
  parentOrder.order.push(child);
  parentOrder.order = sortItems(subjects.dict, parentOrder);
  subjects.dict[child].parents.add(subjectId);
  sortAllViews(state, subjectId);
};
