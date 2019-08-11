import { useCallback } from "react";
import { setFieldsArray } from "../../model/Subject/SetFieldsArray";
import { useDispatch } from "react-redux";
import { setFieldsDesc } from "../../model/Subject/SetFieldsDesc";
import { IColumn } from "office-ui-fabric-react";
import { SortField, SetSortParameters } from "../../model/Order";
import { Item } from "../../model/Subject";
import { History } from "history";
import { gotoSubject } from "../../model/Subject/Routing";

interface UseListViewDetailsList {
  history: History;
  sortFields: SortField[];
  reorderParams: SetSortParameters;
}

export function useListViewDetailsList({
  history,
  reorderParams,
  sortFields,
}: UseListViewDetailsList) {
  const dispatch = useDispatch();

  const reorder = useCallback(
    (draggedIndex: number, targetIndex: number): void => {
      const dragged = sortFields[draggedIndex];
      const fields = sortFields.filter((_, index) => index !== draggedIndex);
      fields.splice(targetIndex, 0, dragged);
      dispatch(setFieldsArray(fields, reorderParams));
    },
    [sortFields, dispatch, reorderParams],
  );

  const dispatchSetFieldsDesc = useCallback(
    (e?: any, column?: IColumn): void => {
      if (column!.key !== "openButton") {
        dispatch(
          setFieldsDesc(
            column!.key,
            !column!.isSortedDescending,
            reorderParams,
          ),
        );
      }
    },
    [dispatch, reorderParams],
  );

  const getKey = useCallback((item: Item): string => item.id, []);

  const onItemInvoked = useCallback(
    (item: Item): void => {
      history.push(gotoSubject("list", item.id));
    },
    [history],
  );

  return { dispatchSetFieldsDesc, getKey, onItemInvoked, reorder };
}
