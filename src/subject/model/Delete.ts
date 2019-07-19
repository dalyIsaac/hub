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
  for (const parentId of state.dict[subjectId].parents) {
    remove(state.dict[parentId].children.order, (s) => s === subjectId);
  }
  for (const childId of state.dict[subjectId].children.order) {
    state.dict[childId].parents.delete(subjectId);
  }
  remove(state.order.order, (s) => s === subjectId);
  delete state.dict[subjectId];
};
