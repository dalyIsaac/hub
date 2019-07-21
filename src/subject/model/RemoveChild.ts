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
  parent,
  subjectId,
  type: REMOVE_CHILD_SUBJECT,
});

export const removeChildReducer = (
  state: SubjectState,
  { subjectId, parent }: RemoveChildAction,
): void => {
  remove(state.dict[parent].children.order, (s): boolean => s === subjectId);
  state.dict[subjectId].parents.delete(parent);
};
