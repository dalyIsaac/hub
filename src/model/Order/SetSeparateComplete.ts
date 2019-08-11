import { sortItems, SetSortParameters, OrderBaseAction } from ".";
import { State } from "../../Reducer";
import { SubjectState } from "../Subject";

export const SET_SEPARATE_COMPLETE = "SET_SEPARATE_COMPLETE";

export interface SetSeparateCompleteAction extends OrderBaseAction {
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

function setSubjects(
  subjects: SubjectState,
  {
    separateCompletedItems,
    parameters: { subjectId, setSearchOptions },
  }: SetSeparateCompleteAction,
) {
  let options;
  if (setSearchOptions) {
    options = subjects.searchSortOptions;
  } else if (subjectId) {
    options = subjects.dict[subjectId].children.options;
  } else {
    options = subjects.order.options;
  }

  options.separateCompletedItems = separateCompletedItems;
  if (subjectId) {
    const children = subjects.dict[subjectId].children;
    children.order = sortItems(subjects.dict, children);
  }
}

function setViews(
  state: State,
  { separateCompletedItems, parameters: { viewId } }: SetSeparateCompleteAction,
) {
  const view = state.views.dict[viewId!];
  view.children.options.separateCompletedItems = separateCompletedItems;
  view.children.order = sortItems(state.subjects.dict, view.children);
}

export const setSeparateCompleteReducer = (
  state: State,
  action: SetSeparateCompleteAction,
): void => {
  if (action.parameters.viewId) {
    setViews(state, action);
  } else {
    setSubjects(state.subjects, action);
  }
};
