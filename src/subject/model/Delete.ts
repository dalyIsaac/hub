import { remove } from "lodash";
import { SubjectState, SubjectBaseAction } from "./Subject";
import { sortAllParents } from "../../Order";

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
    remove(
      state.dict[parentId].children.order,
      (s): boolean => s === subjectId,
    );
  }
  for (const childId of state.dict[subjectId].children.order) {
    state.dict[childId].parents.delete(subjectId);
  }
  remove(state.order.order, (s): boolean => s === subjectId);
  sortAllParents(state.dict, subjectId);
  delete state.dict[subjectId];
};
