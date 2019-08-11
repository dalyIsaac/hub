import { SortField, sortItems, SetSortParameters, OrderBaseAction } from ".";
import { State } from "../../Reducer";
import { SubjectState } from "../Subject";

export const SET_FIELDS_ARRAY = "SET_FIELDS_ARRAY";

export interface SetFieldsArrayAction extends OrderBaseAction {
  parameters: SetSortParameters;
  fields: SortField[];
}

export const setFieldsArray = (
  fields: SortField[],
  parameters: SetSortParameters,
): SetFieldsArrayAction => ({
  fields,
  parameters,
  type: SET_FIELDS_ARRAY,
});

function setSubjects(
  subjects: SubjectState,
  { parameters: { subjectId, setSearchOptions }, fields }: SetFieldsArrayAction,
) {
  let options;
  if (setSearchOptions) {
    options = subjects.searchSortOptions;
  } else if (subjectId) {
    options = subjects.dict[subjectId].children.options;
  } else {
    options = subjects.order.options;
  }

  options.fields = fields;
  if (subjectId) {
    const children = subjects.dict[subjectId].children;
    children.order = sortItems(subjects.dict, children);
  }
}

function setViews(
  state: State,
  { parameters: { viewId }, fields }: SetFieldsArrayAction,
) {
  const children = state.views.dict[viewId!].children;
  children.options.fields = fields;
  children.order = sortItems(state.subjects.dict, children);
}

export const setFieldsArrayReducer = (
  state: State,
  action: SetFieldsArrayAction,
): void => {
  if (action.parameters.viewId) {
    setViews(state, action);
  } else {
    setSubjects(state.subjects, action);
  }
};
