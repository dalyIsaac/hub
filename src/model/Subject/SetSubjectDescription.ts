import { SubjectBaseAction } from ".";
import { sortAllParents, sortAllViews } from "../Order";
import { State } from "../../Reducer";

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
  state: State,
  { subjectId, description }: SetSubjectDescriptionAction,
): void => {
  state.subjects.dict[subjectId].description = description;
  sortAllParents(state.subjects.dict, subjectId);
  sortAllViews(state, subjectId);
};
