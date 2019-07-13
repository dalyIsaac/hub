import React from "react";
import { List } from "office-ui-fabric-react/lib/List";
import { useSelector } from "react-redux";
import { State } from "../reducer";
import { ListViewItem } from "./listItem";

interface ListViewProps {
  id: string;
}

export default function({ id }: ListViewProps): JSX.Element {
  const subjects = useSelector((state: State) => state.subjects);

  const childIds = subjects[id].children;
  const children = [];
  for (const id of childIds) {
    children.push({ id, subject: subjects[id] });
  }

  return (
    <div data-is-scrollable="true">
      <List items={children} onRenderCell={ListViewItem} />
    </div>
  );
}
