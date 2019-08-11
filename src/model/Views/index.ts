import { OrderState } from "../Order";
import { BaseAction } from "../../Common";

export interface View {
  name: string;
  children: OrderState;
}

export interface ViewDictState {
  /**
   * The key is the name of the view
   */
  [key: string]: View;
}

export interface ViewState {
  dict: ViewDictState;
  order: string[];
  orderSet: Set<string>;
}

export interface ViewBaseAction extends BaseAction {
  viewId: string;
}
