import { BaseAction } from "../../Common";
import { SubjectState } from "./Subject";
import { sortItems } from "./Order";

export const SET_SEPARATE_COMPLETE = "SET_SEPARATE_COMPLETE";

export interface SetSeparateCompleteAction extends BaseAction {
  subjectId?: string;
  separateCompletedItems: boolean;
}

export const setSeparateComplete = (
  separateCompletedItems: boolean,
  subjectId?: string,
): SetSeparateCompleteAction => ({
  type: SET_SEPARATE_COMPLETE,
  separateCompletedItems,
  subjectId,
});

export const setSeparateCompleteReducer = (
  state: SubjectState,
  { separateCompletedItems, subjectId }: SetSeparateCompleteAction,
) => {
  const children = subjectId ? state.dict[subjectId].children : state.order;
  children.options.separateCompletedItems = separateCompletedItems;
  children.order = sortItems(state.dict, children);
};
