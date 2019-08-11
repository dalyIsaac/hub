import { SubjectState, SubjectBaseAction } from ".";
import { sortAllParents } from "../Order";

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
  state.dict[subjectId].dueDate = date;
  sortAllParents(state.dict, subjectId);
};
