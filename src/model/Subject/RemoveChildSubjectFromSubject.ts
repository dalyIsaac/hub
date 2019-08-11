import { SubjectBaseAction } from ".";

import { remove } from "lodash";
import { sortAllParents, sortAllViews } from "../Order";
import { State } from "../../Reducer";

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
  state: State,
  { subjectId, parent }: RemoveChildSubjectFromSubjectAction,
): void => {
  const { subjects } = state;
  remove(subjects.dict[parent].children.order, (s): boolean => s === subjectId);
  subjects.dict[subjectId].parents.delete(parent);
  sortAllParents(subjects.dict, subjectId);
  sortAllViews(state, subjectId);
};
