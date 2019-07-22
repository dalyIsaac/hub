import React, { useCallback } from "react";
import { IColumn, DetailsList, SelectionMode } from "office-ui-fabric-react";
import { Subject } from "../model/Subject";

interface ListViewProps {
  items: Subject[];
}

export default function ListView({ items }: ListViewProps): JSX.Element {
  const renderDate = useCallback(
    (subject: Subject, _index?: number, column?: IColumn): string => {
      const date = subject[column!.key as keyof Subject] as Date;
      return date ? date.toLocaleString() : "";
    },
    [],
  );

  // TODO: render link button

  const columns: IColumn[] = [
    {
      fieldName: "name",
      key: "name",
      minWidth: 150,
      name: "Name",
    },
    {
      fieldName: "description",
      key: "description",
      minWidth: 150,
      name: "Description",
    },
    {
      fieldName: "created",
      key: "created",
      minWidth: 150,
      name: "Created",
      onRender: renderDate,
    },
    {
      fieldName: "dueDate",
      key: "dueDate",
      minWidth: 150,
      name: "Due date",
      onRender: renderDate,
    },
    {
      fieldName: "completed",
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
