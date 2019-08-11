import React, { useCallback } from "react";

import { Item } from "../../../model/Subject";
import ListItemBase from "./ListItemBase";
import { appendChildSubjectToSubject } from "../../../model/Subject/AppendChildSubjectToSubject";
import { isUndefined } from "lodash";
import { useDispatch } from "react-redux";

function ListItem({ id, parent, subject }: Item): JSX.Element {
  const dispatch = useDispatch();

  const onChange = useCallback(
    (
      e: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
      checked?: boolean,
    ): void => {
      if (checked === true) {
        dispatch(appendChildSubjectToSubject(parent!, id));
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
