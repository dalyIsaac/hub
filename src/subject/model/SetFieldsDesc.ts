import { SubjectState } from "./Subject";
import { BaseAction } from "../../Common";
import { sortItems, SetSortParameters } from "../../model/Order";

export const SET_FIELDS_DESC = "SET_FIELDS_DESC";

export interface SetFieldsDescAction extends BaseAction {
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

export const setFieldsDescReducer = (
  state: SubjectState,
  {
    parameters: { subjectId, setSearchOptions },
    key,
    desc,
  }: SetFieldsDescAction,
): void => {
  let options;
  if (setSearchOptions) {
    options = state.searchSortOptions;
  } else if (subjectId) {
    options = state.dict[subjectId].children.options;
  } else {
    options = state.order.options;
  }

  for (const f of options.fields) {
    if (f.key === key) {
      f.desc = desc;
      if (subjectId) {
        const children = state.dict[subjectId].children;
        children.order = sortItems(state.dict, children);
      }
      return;
    }
  }
};
