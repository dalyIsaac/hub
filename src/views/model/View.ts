import { OrderState } from "../../Order";

export interface View {
  name: string;
  children: OrderState;
}

export interface ViewDictState {
  [key: string]: View;
}

export interface ViewState {
  dict: ViewDictState;
  order: string[];
}
