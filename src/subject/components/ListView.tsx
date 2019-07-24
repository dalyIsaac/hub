import React, { useCallback } from "react";
import { IColumn, DetailsList, SelectionMode } from "office-ui-fabric-react";
import { Subject, GetItemsOptions, getItems, Item } from "../model/Subject";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";

interface ListViewProps {
  options?: GetItemsOptions;
}

export default function ListView({ options }: ListViewProps): JSX.Element {
  const renderSubjectString = useCallback(
    (item: Item, _index?: number, column?: IColumn): string =>
      item.subject[column!.key as keyof Subject] as string,
    [],
  );

  const renderDate = useCallback(
    (item: Item, _index?: number, column?: IColumn): string => {
      const date = item.subject[column!.key as keyof Subject] as Date;
      return date ? date.toLocaleString() : "";
    },
    [],
  );

  const { subjects } = useSelector((state: State) => state);
  const items = getItems(subjects.dict, subjects.order.order, options);

  // TODO: render link button

  const columns: IColumn[] = [
    {
      key: "name",
      minWidth: 150,
      name: "Name",
      onRender: renderSubjectString,
    },
    {
      key: "description",
      minWidth: 150,
      name: "Description",
      onRender: renderSubjectString,
    },
    {
      key: "created",
      minWidth: 150,
      name: "Created",
      onRender: renderDate,
    },
    {
      key: "dueDate",
      minWidth: 150,
      name: "Due date",
      onRender: renderDate,
    },
    {
      key: "completed",
      minWidth: 150,
      name: "Completed",
      onRender: renderDate,
    },
  ];

  return (
    <DetailsList
      columns={columns}
      items={items}
      isHeaderVisible={true}
      selectionMode={SelectionMode.none}
    />
  );
}
