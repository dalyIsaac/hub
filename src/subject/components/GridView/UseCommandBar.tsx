import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import SortButton from "../../../AppCommandBar/SortButton";
import { State } from "../../../Reducer";
import { Toggle } from "office-ui-fabric-react";
import { setSeparateComplete } from "../../model/SetSeparateComplete";

export function useCommandBar(subjectId?: string) {
  const dispatch = useDispatch();
  const subjects = useSelector((state: State) => state.subjects);

  const currentOrder =
    subjectId && subjectId in subjects.dict
      ? subjects.dict[subjectId].children.options
      : subjects.order.options;

  const setSeparateCompleteOnChange = useCallback(
    (e: any, checked?: boolean): void => {
      dispatch(setSeparateComplete(checked!, { subjectId: subjectId }));
    },
    [dispatch, subjectId],
  );

  return [
    <SortButton
      key="sort"
      subjectId={subjectId}
      fields={currentOrder.fields}
    />,
    <Toggle
      key="separateComplete"
      checked={currentOrder.separateCompletedItems}
      offText={"Don't separate completed items"}
      onText={"Separate completed items"}
      onChange={setSeparateCompleteOnChange}
      styles={{ root: { marginBottom: 0, marginLeft: 4, marginRight: 4 } }}
    />,
  ];
}
