import { SubjectState, SubjectBaseAction } from "./Subject";

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
  state[subjectId].name = name;
};
