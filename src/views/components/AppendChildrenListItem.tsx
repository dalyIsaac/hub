import React, { useCallback } from "react";
import { Item } from "../../subject/model/Subject";
import { useDispatch } from "react-redux";
import { isUndefined } from "lodash";
import ListItemBase from "../../subject/components/ListItem/ListItemBase";
import { appendChildView } from "../model/AppendChild";

function ListItem({ id, viewId, subject }: Item): JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback(
    (
      e: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
      checked?: boolean,
    ): void => {
      if (checked === true) {
        dispatch(appendChildView(viewId!, id));
      }
    },
    [dispatch, id, viewId],
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
  if (!props || isUndefined(props.viewId)) {
    return;
  }

  return <ListItem {...props} />;
}
