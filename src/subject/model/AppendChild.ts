import { SubjectBaseAction, SubjectState } from "./Subject";
import { sortItems } from "./Order";

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
  const parentOrder = state.dict[subjectId].children;
  parentOrder.order.push(child);
  parentOrder.order = sortItems(state.dict, parentOrder);
  state.dict[child].parents.add(subjectId);
};
