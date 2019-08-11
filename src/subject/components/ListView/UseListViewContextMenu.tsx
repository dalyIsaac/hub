import { useCallback, useState } from "react";
import { IDetailsListProps } from "office-ui-fabric-react";
import { ListViewContextMenuProps } from "./ListViewContextMenu";
import { UseListViewModal } from "./UseListViewModal";
import { Item } from "../../../model/Subject";

interface UseListViewContextMenu {
  contextMenuProps: ListViewContextMenuProps | null;
  onItemContextMenu: IDetailsListProps["onItemContextMenu"];
}
export function useListViewContextMenu(
  setModalItem: UseListViewModal["setModalItem"],
  showCloseButton?: boolean,
): UseListViewContextMenu {
  const [
    contextMenuProps,
    updateContextMenuProps,
  ] = useState<ListViewContextMenuProps | null>(null);
  const dismissContextMenu = useCallback((): void => {
    updateContextMenuProps(null);
  }, []);
  const onItemContextMenu = useCallback(
    (item?: Item, index?: number, ev?: Event): boolean => {
      if (item && ev) {
        updateContextMenuProps({
          ev,
          item,
          onDismiss: dismissContextMenu,
          onEditClick: setModalItem,
          showCloseButton,
        });
        // stops ev.preventDefault()
        return false;
      } else {
        // runs ev.preventDefault()
        return true;
      }
    },
    [dismissContextMenu, showCloseButton, setModalItem],
  );
  return { contextMenuProps, onItemContextMenu };
}
