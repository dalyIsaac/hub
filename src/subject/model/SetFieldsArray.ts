import { SortField, sortItems } from "./Order";
import { SubjectState } from "./Subject";
import { BaseAction } from "../../Common";

export const SET_FIELDS_ARRAY = "SET_FIELDS_ARRAY";

export interface SetFieldsArrayAction extends BaseAction {
  subjectId?: string;
  fields: SortField[];
}

export const setFieldsArray = (
  fields: SortField[],
  subjectId?: string,
): SetFieldsArrayAction => ({
  type: SET_FIELDS_ARRAY,
  subjectId,
  fields,
});

export const setFieldsArrayReducer = (
  state: SubjectState,
  { subjectId, fields }: SetFieldsArrayAction,
) => {
  const children = subjectId ? state.dict[subjectId].children : state.order;
  children.options.fields = fields;
  children.order = sortItems(state.dict, children);
};
