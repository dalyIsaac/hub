import { SubjectBaseAction, SubjectState } from "./Subject";

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
  state: SubjectState,
  subjectId: string,
  level: number,
  date = new Date(),
): void => {
  state[subjectId].completed = new Date();
  if (level > 1) {
    for (const childId of state[subjectId].children) {
      markAsComplete(state, childId, level - 1, date);
    }
  }
};

export const completeSubjectReducer = (
  state: SubjectState,
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
  state: SubjectState,
  { subjectId }: UncompleteSubjectAction,
): void => {
  state[subjectId].completed = undefined;
};
