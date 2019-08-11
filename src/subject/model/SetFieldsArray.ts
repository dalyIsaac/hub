import { SortField, sortItems, SetSortParameters } from "../../model/Order";
import { SubjectState } from "./Subject";
import { BaseAction } from "../../Common";

export const SET_FIELDS_ARRAY = "SET_FIELDS_ARRAY";

export interface SetFieldsArrayAction extends BaseAction {
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

export const setFieldsArrayReducer = (
  state: SubjectState,
  { parameters: { subjectId, setSearchOptions }, fields }: SetFieldsArrayAction,
): void => {
  let options;
  if (setSearchOptions) {
    options = state.searchSortOptions;
  } else if (subjectId) {
    options = state.dict[subjectId].children.options;
  } else {
    options = state.order.options;
  }

  options.fields = fields;
  if (subjectId) {
    const children = state.dict[subjectId].children;
    children.order = sortItems(state.dict, children);
  }
};
