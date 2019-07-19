import {
  UpdateOrderAction,
  UPDATE_ORDER,
  updateOrderReducer,
} from "./model/UpdateOrder";
import { Action } from "redux";
import { OrderState } from "./model/Order";

const updateOrder = (state: OrderState = [], action: Action) => {
  switch (action.type) {
    case UPDATE_ORDER:
      return updateOrderReducer(state, action as UpdateOrderAction);
    default:
      return state;
  }
};

export default updateOrder;
