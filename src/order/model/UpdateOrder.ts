import { BaseAction } from "../../Common";
import { OrderState } from "./Order";

export const UPDATE_ORDER = "UPDATE_ORDER";

export interface UpdateOrderAction extends BaseAction {
  order: string[];
}

export const updateOrder = (order: string[]): UpdateOrderAction => ({
  type: UPDATE_ORDER,
  order,
});

export const updateOrderReducer = (
  state: OrderState,
  { order }: UpdateOrderAction,
): OrderState => {
  return order;
};
