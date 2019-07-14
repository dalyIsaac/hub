import { SubjectState, SubjectBaseAction } from "./Subject";

export const UPDATE_SUBJECT_NAME = "UPDATE_SUBJECT_NAME";

export interface UpdateSubjectNameAction extends SubjectBaseAction {
  name: string;
}

export const updateSubjectNameAction = (
  subjectId: string,
  name: string,
): UpdateSubjectNameAction => ({
  name,
  subjectId,
  type: UPDATE_SUBJECT_NAME,
});

export const updateSubjectNameReducer = (
  state: SubjectState,
  { subjectId, name }: UpdateSubjectNameAction,
): void => {
  state[subjectId].name = name;
};
