import React, { useCallback } from "react";
import { Item, Subject } from "../../model/Subject";
import { IColumn } from "office-ui-fabric-react";
import ListViewButtons from "./ListViewButtons";
import { SortField, SortFieldKey } from "../../../model/Order";

interface UseListView {
  openModal: (item: Item) => void;
  showCloseButton?: boolean;
  sortFields: SortField[];
}

export function useListViewRender({
  openModal,
  showCloseButton,
  sortFields,
}: UseListView) {
  const renderSubjectString = useCallback(
    (item: Item, _index?: number, column?: IColumn): string =>
      item.subject[column!.key as keyof Subject] as string,
    [],
  );

  const renderChildren = useCallback(
    (item: Item): string => item.subject.children.order.length.toLocaleString(),
    [],
  );

  const renderDate = useCallback(
    (item: Item, _index?: number, column?: IColumn): string => {
      const date = item.subject[column!.key as keyof Subject] as Date;
      return date ? date.toLocaleString() : "";
    },
    [],
  );

  const renderButtons = useCallback(
    (item: Item): JSX.Element => (
      <ListViewButtons
        item={item}
        openModal={openModal}
        showCloseButton={showCloseButton}
      />
    ),
    [openModal, showCloseButton],
  );

  const columnsDict: Partial<{ [key in SortFieldKey]: IColumn }> = {
    children: {
      isResizable: true,
      key: "children",
      minWidth: 100,
      name: "# Children",
      onRender: renderChildren,
    },
    completed: {
      isResizable: true,
      key: "completed",
      minWidth: 150,
      name: "Completed",
      onRender: renderDate,
    },
    created: {
      isResizable: true,
      key: "created",
      minWidth: 150,
      name: "Date created",
      onRender: renderDate,
    },
    description: {
      isResizable: true,
      key: "description",
      minWidth: 100,
      name: "Description",
      onRender: renderSubjectString,
    },
    dueDate: {
      isResizable: true,
      key: "dueDate",
      minWidth: 150,
      name: "Due date",
      onRender: renderDate,
    },
    name: {
      isResizable: true,
      key: "name",
      minWidth: 100,
      name: "Name",
      onRender: renderSubjectString,
    },
  };

  const columns: IColumn[] = [];
  for (const field of sortFields) {
    const current = columnsDict[field.key];
    if (current) {
      current.isSorted = true;
      current.isSortedDescending = field.desc;
      columns.push(current);
    }
  }

  columns.push({
    key: "itemButtons",
    minWidth: 80,
    name: "",
    onRender: renderButtons,
  });
  return columns;
}
