import { remove } from "lodash";
import { SubjectState, SubjectBaseAction } from "./Subject";

export const DELETE_SUBJECT = "DELETE_SUBJECT";

export interface DeleteSubjectAction extends SubjectBaseAction {}

export const deleteSubject = (subjectId: string): DeleteSubjectAction => ({
  subjectId,
  type: DELETE_SUBJECT,
});

export const deleteSubjectReducer = (
  state: SubjectState,
  { subjectId }: DeleteSubjectAction,
): void => {
  for (const parentId of state[subjectId].parents) {
    remove(state[parentId].children, (s) => s === subjectId);
  }
  for (const childId of state[subjectId].children) {
    state[childId].parents.delete(subjectId);
  }
  delete state[subjectId];
};
