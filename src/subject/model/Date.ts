import { SubjectState, SubjectBaseAction } from "./Subject";

// Set subject due date
export const SET_SUBJECT_DUE_DATE = "SET_SUBJECT_DUE_DATE";

export interface SetSubjectDueDateAction extends SubjectBaseAction {
  date?: Date;
}

export const setSubjectDueDate = (
  subjectId: string,
  date?: Date,
): SetSubjectDueDateAction => ({
  date,
  subjectId,
  type: SET_SUBJECT_DUE_DATE,
});

export const setSubjectDueDateReducer = (
  state: SubjectState,
  { subjectId, date }: SetSubjectDueDateAction,
): void => {
  state[subjectId].dueDate = date;
};
