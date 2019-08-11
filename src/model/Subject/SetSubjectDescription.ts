import { SubjectState, SubjectBaseAction } from ".";
import { sortAllParents } from "../Order";

export const SET_SUBJECT_DESCRIPTION = "SET_SUBJECT_DESCRIPTION";

export interface SetSubjectDescriptionAction extends SubjectBaseAction {
  description: string;
}

export const setSubjectDescription = (
  subjectId: string,
  description: string,
): SetSubjectDescriptionAction => ({
  description,
  subjectId,
  type: SET_SUBJECT_DESCRIPTION,
});

export const setSubjectDescriptionReducer = (
  state: SubjectState,
  { subjectId, description }: SetSubjectDescriptionAction,
): void => {
  state.dict[subjectId].description = description;
  sortAllParents(state.dict, subjectId);
};
