import React, { useCallback } from "react";
import { Item } from "../../model/Subject";
import { useDispatch } from "react-redux";
import { appendChild } from "../../model/AppendChild";
import { isUndefined } from "lodash";
import ListItemBase from "./ListItemBase";

function ListItem({ id, parent, subject }: Item): JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback(
    (
      e: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
      checked?: boolean,
    ): void => {
      if (checked === true) {
        dispatch(appendChild(parent!, id));
      }
    },
    [dispatch, id, parent],
  );

  return (
    <ListItemBase
      checked={false}
      label={subject.name}
      onCheckboxChange={onChange}
    />
  );
}

export default function AppendChildrenListItem(
  props?: Item,
): JSX.Element | undefined {
  if (!props || isUndefined(props.parent)) {
    return;
  }

  return <ListItem {...props} />;
}
