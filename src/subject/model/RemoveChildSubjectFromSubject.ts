import { SubjectBaseAction, SubjectState } from "./Subject";

import { remove } from "lodash";
import { sortAllParents } from "../../model/Order";

export const REMOVE_CHILD_SUBJECT_FROM_SUBJECT_REDUCER =
  "REMOVE_CHILD_SUBJECT_FROM_SUBJECT_REDUCER";

export interface RemoveChildSubjectFromSubjectAction extends SubjectBaseAction {
  parent: string;
}

export const removeChildSubjectFromSubject = (
  subjectId: string,
  parent: string,
): RemoveChildSubjectFromSubjectAction => ({
  parent,
  subjectId,
  type: REMOVE_CHILD_SUBJECT_FROM_SUBJECT_REDUCER,
});

export const removeChildSubjectFromSubjectReducer = (
  state: SubjectState,
  { subjectId, parent }: RemoveChildSubjectFromSubjectAction,
): void => {
  remove(state.dict[parent].children.order, (s): boolean => s === subjectId);
  state.dict[subjectId].parents.delete(parent);
  sortAllParents(state.dict, subjectId);
};
