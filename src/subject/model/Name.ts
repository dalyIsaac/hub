import { SubjectState, SubjectBaseAction } from "./Subject";
import { sortAllParents } from "./Order";

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
  state: SubjectState,
  { subjectId, name }: SetSubjectNameAction,
): void => {
  state.dict[subjectId].name = name;
  sortAllParents(state.dict, subjectId);
};
