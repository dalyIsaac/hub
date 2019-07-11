import React from "react";
import { List } from "office-ui-fabric-react/lib/List";
import { useSelector } from "react-redux";
import { State } from "../reducer";
import { Subject } from "./model";
import ListItem from "./listItem";
import { mergeStyleSets } from "@uifabric/styling";

interface ListViewProps {
  id: string;
}

const styles = mergeStyleSets({});

export default function({ id }: ListViewProps): JSX.Element {
  const subjects = useSelector((state: State) => state.subjects);

  const childIds = subjects[id].children;
  const children: Subject[] = [];
  childIds.forEach(i => children.push(subjects[i]));

  return (
    <div data-is-scrollable="true">
      <List items={children} onRenderCell={ListItem} />
    </div>
  );
}
