import { OrderState } from "../../Order";
import { BaseAction } from "../../Common";

export type View = OrderState;

export interface ViewDictState {
  /**
   * The key is the name of the view
   */
  [key: string]: View;
}

export interface ViewState {
  dict: ViewDictState;
  order: string[];
}

export interface ViewBaseAction extends BaseAction {
  viewName: string;
}
