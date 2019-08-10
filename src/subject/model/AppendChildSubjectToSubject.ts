import { SubjectBaseAction, SubjectState } from "./Subject";

import { sortItems } from "../../Order";

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
  state: SubjectState,
  { subjectId, child }: AppendChildSubjectToSubjectAction,
): void => {
  const parentOrder = state.dict[subjectId].children;
  parentOrder.order.push(child);
  parentOrder.order = sortItems(state.dict, parentOrder);
  state.dict[child].parents.add(subjectId);
};
