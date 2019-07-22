import { SubjectBaseAction, SubjectState, SubjectDictState } from "./Subject";
import { sortAllParents } from "./Order";

// Complete subject
export const COMPLETE_SUBJECT = "COMPLETE_SUBJECT";

export interface CompleteSubjectAction extends SubjectBaseAction {
  level: number;
}

export const completeSubject = (
  subjectId: string,
  level = 1,
): CompleteSubjectAction => ({
  level,
  subjectId,
  type: COMPLETE_SUBJECT,
});

const markAsComplete = (
  dict: SubjectDictState,
  subjectId: string,
  level: number,
  date = new Date(),
): void => {
  if (dict[subjectId].completed === undefined) {
    dict[subjectId].completed = date;
    sortAllParents(dict, subjectId);
    if (level > 1) {
      for (const childId of dict[subjectId].children.order) {
        markAsComplete(dict, childId, level - 1, date);
      }
    }
  }
};

export const completeSubjectReducer = (
  state: SubjectState,
  { subjectId, level }: CompleteSubjectAction,
): void => {
  markAsComplete(state.dict, subjectId, level);
};

// Remove subject completion
export const UNCOMPLETE_SUBJECT = "UNCOMPLETE_SUBJECT";

export interface UncompleteSubjectAction extends SubjectBaseAction {}

export const uncompleteSubject = (
  subjectId: string,
): UncompleteSubjectAction => ({
  subjectId,
  type: UNCOMPLETE_SUBJECT,
});

export const uncompleteSubjectReducer = (
  state: SubjectState,
  { subjectId }: UncompleteSubjectAction,
): void => {
  state.dict[subjectId].completed = undefined;
  sortAllParents(state.dict, subjectId);
};
