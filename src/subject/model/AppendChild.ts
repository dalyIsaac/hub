import { SubjectBaseAction, SubjectState } from "./Subject";

export const APPEND_CHILD_SUBJECT = "APPEND_CHILD_SUBJECT";

export interface AppendChildAction extends SubjectBaseAction {
  child: string;
}

export const appendChild = (
  subjectId: string,
  child: string,
): AppendChildAction => ({
  child,
  subjectId,
  type: APPEND_CHILD_SUBJECT,
});

export const appendChildReducer = (
  state: SubjectState,
  { subjectId, child }: AppendChildAction,
): void => {
  state.dict[subjectId].children.order.push(child);
  state.dict[child].parents.add(subjectId);
};
