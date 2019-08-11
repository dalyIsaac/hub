/* eslint @typescript-eslint/explicit-function-return-type: "off" */

import { createTransform } from "redux-persist";
import { ViewState } from ".";

interface PersistSubjectState extends Omit<ViewState, "orderSet"> {}

const transformViews = createTransform<ViewState, PersistSubjectState>(
  ({ orderSet, ...everythingElse }, _key) => {
    return everythingElse;
  },
  (state, _key) => {
    const orderSet = new Set<string>();
    for (const viewId of state.order) {
      orderSet.add(state.dict[viewId].name);
    }
    return { ...state, orderSet };
  },
  {
    whitelist: ["views"],
  },
);

export default transformViews;
