import { SubjectBaseAction } from ".";
import { sortAllParents, sortAllViews } from "../Order";
import { State } from "../../Reducer";

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
  state: State,
  subjectId: string,
  level: number,
  date = new Date(),
): void => {
  const {
    subjects: { dict },
  } = state;
  if (dict[subjectId].completed === undefined) {
    dict[subjectId].completed = date;
    sortAllParents(dict, subjectId);
    sortAllViews(state, subjectId);
    if (level > 1) {
      for (const childId of dict[subjectId].children.order) {
        markAsComplete(state, childId, level - 1, date);
      }
    }
  }
};

export const completeSubjectReducer = (
  state: State,
  { subjectId, level }: CompleteSubjectAction,
): void => {
  markAsComplete(state, subjectId, level);
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
  state: State,
  { subjectId }: UncompleteSubjectAction,
): void => {
  state.subjects.dict[subjectId].completed = undefined;
  sortAllParents(state.subjects.dict, subjectId);
  sortAllViews(state, subjectId);
};
