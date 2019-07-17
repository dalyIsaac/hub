import { SubjectBaseAction, SubjectState } from "./Subject";
import { remove } from "lodash";

export const REMOVE_CHILD_SUBJECT = "REMOVE_CHILD_SUBJECT";

export interface RemoveChildAction extends SubjectBaseAction {
  parent: string;
}

export const removeChild = (
  subjectId: string,
  parent: string,
): RemoveChildAction => ({
  subjectId,
  parent,
  type: REMOVE_CHILD_SUBJECT,
});

export const removeChildReducer = (
  state: SubjectState,
  { subjectId, parent }: RemoveChildAction,
): void => {
  remove(state[parent].children, (s) => s === subjectId);
  state[subjectId].parents.delete(parent);
};
