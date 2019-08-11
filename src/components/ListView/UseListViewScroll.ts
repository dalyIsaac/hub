import { IDetailsList } from "office-ui-fabric-react";
import { useRef, useEffect } from "react";
import { UseSubjectView, getDiffIndex } from "../SubjectView";
import { SubjectState } from "../../model/Subject";

interface UseListViewScroll {
  currentOrder: string[];
  componentOrder: string[];
  parentId?: string;
  setCurrentOrder: UseSubjectView["setCurrentOrder"];
  subjects: SubjectState;
}

export function useListViewScroll({
  componentOrder,
  currentOrder,
  parentId,
  setCurrentOrder,
  subjects,
}: UseListViewScroll) {
  const listRef: React.MutableRefObject<IDetailsList | null> = useRef(null);

  useEffect((): void => {
    if (
      listRef.current &&
      currentOrder !== componentOrder &&
      componentOrder.length > 0
    ) {
      // Gets the index to scroll to
      const index = getDiffIndex(currentOrder, componentOrder);

      // Scroll to the index if either:
      // - the new index doesn't have a parent
      // - the new index has a parent, which matches match.param.id
      const s = subjects.dict[componentOrder[index]];
      if (s.parents.size === 0 || s.parents.has(parentId!)) {
        listRef.current.focusIndex(index);
      }

      setCurrentOrder(componentOrder);
    }
  }, [componentOrder, parentId, currentOrder, subjects, setCurrentOrder]);

  return listRef;
}
