import { SubjectBaseAction } from ".";
import { sortAllParents, sortAllViews } from "../Order";
import { State } from "../../Reducer";

export const SET_SUBJECT_NAME = "SET_SUBJECT_NAME";

export interface SetSubjectNameAction extends SubjectBaseAction {
  name: string;
}

export const setSubjectName = (
  subjectId: string,
  name: string,
): SetSubjectNameAction => ({
  name,
  subjectId,
  type: SET_SUBJECT_NAME,
});

export const setSubjectNameReducer = (
  state: State,
  { subjectId, name }: SetSubjectNameAction,
): void => {
  state.subjects.dict[subjectId].name = name;
  sortAllParents(state.subjects.dict, subjectId);
  sortAllViews(state, subjectId);
};
