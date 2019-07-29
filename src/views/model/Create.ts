import { State } from "../../Reducer";
import { getInitialOrder } from "../../Order";
import { BaseAction } from "../../Common";
import { ViewDictState } from "./View";

export const CREATE_VIEW = "CREATE_VIEW";

export interface CreateViewAction extends BaseAction {}

export const createView = (): CreateViewAction => ({
  type: CREATE_VIEW,
});

const getUntitledName = (dict: ViewDictState): string => {
  let i = 1;
  let name = `Untitled${i}`;
  while (name in dict) {
    i++;
    name = `Untitled${i}`;
  }
  return name;
};

export const createViewReducer = (state: State): void => {
  const name = getUntitledName(state.views.dict);
  state.views.dict[name] = getInitialOrder();
  state.views.order.push(name);
};
