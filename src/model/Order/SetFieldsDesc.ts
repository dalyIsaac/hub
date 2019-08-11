import { sortItems, SetSortParameters, OrderBaseAction } from ".";
import { State } from "../../Reducer";
import { SubjectState } from "../Subject";

export const SET_FIELDS_DESC = "SET_FIELDS_DESC";

export interface SetFieldsDescAction extends OrderBaseAction {
  parameters: SetSortParameters;
  key: string;
  desc: boolean;
}

export const setFieldsDesc = (
  key: string,
  desc: boolean,
  parameters: SetSortParameters,
): SetFieldsDescAction => ({
  desc,
  key,
  parameters,
  type: SET_FIELDS_DESC,
});

function setSubjects(
  subjects: SubjectState,
  {
    parameters: { subjectId, setSearchOptions },
    key,
    desc,
  }: SetFieldsDescAction,
) {
  let options;
  if (setSearchOptions) {
    options = subjects.searchSortOptions;
  } else if (subjectId) {
    options = subjects.dict[subjectId].children.options;
  } else {
    options = subjects.order.options;
  }

  for (const f of options.fields) {
    if (f.key === key) {
      f.desc = desc;
      if (subjectId) {
        const children = subjects.dict[subjectId].children;
        children.order = sortItems(subjects.dict, children);
      }
      return;
    }
  }
}

function setViews(
  state: State,
  { parameters: { viewId }, key, desc }: SetFieldsDescAction,
) {
  const view = state.views.dict[viewId!];
  for (const f of view.children.options.fields) {
    if (f.key === key) {
      f.desc = desc;
      view.children.order = sortItems(state.subjects.dict, view.children);
      return;
    }
  }
}

export const setFieldsDescReducer = (
  state: State,
  action: SetFieldsDescAction,
): void => {
  if (action.parameters.viewId) {
    setViews(state, action);
  } else {
    setSubjects(state.subjects, action);
  }
};
