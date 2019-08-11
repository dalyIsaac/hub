import { SubjectBaseAction } from "./Subject";

import { remove } from "lodash";
import { sortAllParents } from "../../model/Order";
import { State } from "../../Reducer";

export const DELETE_SUBJECT = "DELETE_SUBJECT";

export interface DeleteSubjectAction extends SubjectBaseAction {}

export const deleteSubject = (subjectId: string): DeleteSubjectAction => ({
  subjectId,
  type: DELETE_SUBJECT,
});


export const deleteSubjectReducer = (
  {subjects, views}: State,
  { subjectId }: DeleteSubjectAction,
): void => {
  function deleteId(arr: string[]) {
    remove(arr, i => i === subjectId);
  }

  const subject = subjects.dict[subjectId];

  // Delete subjectId from its parents' order array
  for (const parentId of subject.parents) {
    deleteId(
      subjects.dict[parentId].children.order,
    );
  }

  // Delete subjectId from its children parents' set
  for (const childId of subject.children.order) {
    subjects.dict[childId].parents.delete(subjectId);
  }

  // Delete subjectId from the subject list
  deleteId(subjects.order.order);
  
  // Delete subjectId from views
  for (const viewId of subject.views) {
    deleteId(views.dict[viewId].children.order)
  }

  sortAllParents(subjects.dict, subjectId);
  delete subjects.dict[subjectId];
};
