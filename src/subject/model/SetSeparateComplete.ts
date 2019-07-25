import { BaseAction } from "../../Common";
import { SubjectState } from "./Subject";
import { sortItems, SetSortParameters } from "./Order";

export const SET_SEPARATE_COMPLETE = "SET_SEPARATE_COMPLETE";

export interface SetSeparateCompleteAction extends BaseAction {
  parameters: SetSortParameters;
  separateCompletedItems: boolean;
}

export const setSeparateComplete = (
  separateCompletedItems: boolean,
  parameters: SetSortParameters,
): SetSeparateCompleteAction => ({
  parameters,
  separateCompletedItems,
  type: SET_SEPARATE_COMPLETE,
});

export const setSeparateCompleteReducer = (
  state: SubjectState,
  {
    separateCompletedItems,
    parameters: { subjectId, setSearchOptions },
  }: SetSeparateCompleteAction,
): void => {
  let options;
  if (setSearchOptions) {
    options = state.searchSortOptions;
  } else if (subjectId) {
    options = state.dict[subjectId].children.options;
  } else {
    options = state.order.options;
  }

  options.separateCompletedItems = separateCompletedItems;
  if (subjectId) {
    const children = state.dict[subjectId].children;
    children.order = sortItems(state.dict, children);
  }
};
