import { SubjectBaseAction } from ".";
import { sortAllParents, sortAllViews } from "../Order";
import { State } from "../../Reducer";

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
  state: State,
  { subjectId, date }: SetSubjectDueDateAction,
): void => {
  state.subjects.dict[subjectId].dueDate = date;
  sortAllParents(state.subjects.dict, subjectId);
  sortAllViews(state, subjectId);
};
