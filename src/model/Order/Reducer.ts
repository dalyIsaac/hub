import {
  SET_FIELDS_ARRAY,
  SetFieldsArrayAction,
  setFieldsArrayReducer,
} from "../Order/SetFieldsArray";
import {
  SET_FIELDS_DESC,
  SetFieldsDescAction,
  setFieldsDescReducer,
} from "../Order/SetFieldsDesc";
import {
  SET_SEPARATE_COMPLETE,
  SetSeparateCompleteAction,
  setSeparateCompleteReducer,
} from "../Order/SetSeparateComplete";

import { State } from "../../Reducer";
import produce from "immer";
import { sortItems, OrderBaseAction } from ".";

const orderReducer = (state: State, action: OrderBaseAction): State => ({
  ...produce(
    state,
    (draftState): State => {
      switch (action.type) {
        case SET_FIELDS_ARRAY:
          setFieldsArrayReducer(draftState, action as SetFieldsArrayAction);
          break;
        case SET_FIELDS_DESC:
          setFieldsDescReducer(draftState, action as SetFieldsDescAction);
          break;
        case SET_SEPARATE_COMPLETE:
          setSeparateCompleteReducer(
            draftState,
            action as SetSeparateCompleteAction,
          );
          break;
      }

      const { subjects } = draftState;

      // Prevents redux-persist from being overridden during hydration.
      if (subjects.order.order.length > 0) {
        subjects.order.order = sortItems(subjects.dict, subjects.order);
      }

      return draftState;
    },
  ),
});

export default orderReducer;
