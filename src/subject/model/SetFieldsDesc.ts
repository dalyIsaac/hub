import { SubjectState } from "./Subject";
import { BaseAction } from "../../Common";
import { sortItems } from "./Order";

export const SET_FIELDS_DESC = "SET_FIELDS_DESC";

export interface SetFieldsDescAction extends BaseAction {
  subjectId?: string;
  key: string;
  desc: boolean;
}

export const setFieldsDesc = (
  key: string,
  desc: boolean,
  subjectId?: string,
): SetFieldsDescAction => ({
  desc,
  key,
  subjectId,
  type: SET_FIELDS_DESC,
});

export const setFieldsDescReducer = (
  state: SubjectState,
  { subjectId, key, desc }: SetFieldsDescAction,
): void => {
  const children = subjectId ? state.dict[subjectId].children : state.order;
  for (const f of children.options.fields) {
    if (f.key === key) {
      f.desc = desc;
      children.order = sortItems(state.dict, children);
      return;
    }
  }
};
