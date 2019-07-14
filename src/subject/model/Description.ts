import { SubjectState, SubjectBaseAction } from "./Subject";

export const UPDATE_SUBJECT_DESCRIPTION = "UPDATE_SUBJECT_DESCRIPTION";

export interface UpdateSubjectDescriptionAction extends SubjectBaseAction {
  description: string;
}

export const updateSubjectDescriptionAction = (
  subjectId: string,
  description: string,
): UpdateSubjectDescriptionAction => ({
  description,
  subjectId,
  type: UPDATE_SUBJECT_DESCRIPTION,
});

export const updateSubjectDescriptionReducer = (
  state: SubjectState,
  { subjectId, description }: UpdateSubjectDescriptionAction,
): void => {
  state[subjectId].description = description;
};
