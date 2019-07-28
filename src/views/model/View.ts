import { OrderState } from "../../subject/model/Order";

export interface View extends OrderState {
  name: string;
}

export interface ViewState {
  [key: string]: View;
}
