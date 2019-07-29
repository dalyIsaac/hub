import { State } from "../../Reducer";
import { getInitialOrder } from "../../Order";
import { ViewDictState, ViewBaseAction } from "./View";
import { v4 } from "uuid";

export const CREATE_VIEW = "CREATE_VIEW";

export interface CreateViewAction extends ViewBaseAction {}

export const createView = (): CreateViewAction => ({
  type: CREATE_VIEW,
  viewId: v4(),
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

export const createViewReducer = (
  state: State,
  { viewId }: CreateViewAction,
): void => {
  const name = getUntitledName(state.views.dict);
  state.views.dict[viewId] = { children: getInitialOrder(), name };
  state.views.order.push(viewId);
};
