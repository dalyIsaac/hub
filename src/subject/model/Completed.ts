import { SubjectBaseAction, SubjectState } from "./Subject";

// Complete subject
export const COMPLETE_SUBJECT = "COMPLETE_SUBJECT";

export interface CompleteSubjectAction extends SubjectBaseAction {}

export const completeSubject = (subjectId: string): CompleteSubjectAction => ({
  subjectId,
  type: COMPLETE_SUBJECT,
});

export const completeSubjectReducer = (
  state: SubjectState,
  { subjectId }: CompleteSubjectAction,
): void => {
  state[subjectId].completed = new Date();
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
