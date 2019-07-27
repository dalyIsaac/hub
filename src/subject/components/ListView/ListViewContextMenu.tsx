import React, { useCallback } from "react";
import { Item } from "../../model/Subject";
import {
  ContextualMenu,
  IContextualMenuItem,
  DirectionalHint,
  IContextualMenuProps,
} from "office-ui-fabric-react";
import { useDispatch } from "react-redux";
import { completeSubject, uncompleteSubject } from "../../model/Completed";
import { deleteSubject } from "../../model/Delete";

export interface ListViewContextMenuProps {
  item: Item;
  ev: Event;
  onEditClick: (item: Item) => void;
  onDismiss: IContextualMenuProps["onDismiss"];
}

export default function ListViewContextMenu({
  item,
  ev,
  onDismiss,
  onEditClick,
}: ListViewContextMenuProps): JSX.Element {
  const dispatch = useDispatch();
  const { id } = item;

  const onChange = useCallback(
    (e: any, checked?: boolean, level?: number): void => {
      if (checked === true) {
        dispatch(completeSubject(id, level));
      } else {
        dispatch(uncompleteSubject(id));
      }
    },
    [dispatch, id],
  );

  const completeOnClick = useCallback(
    (e: any, item?: IContextualMenuItem): void => {
      if (item) {
        onChange(e, !item.checked, 1);
      }
    },
    [onChange],
  );

  const completeWithChildrenOnClick = useCallback(
    (e: any, item?: IContextualMenuItem): void => {
      if (item) {
        onChange(e, !item.checked, 2);
      }
    },
    [onChange],
  );

  const deleteSubjectOnClick = useCallback((): void => {
    dispatch(deleteSubject(id));
  }, [dispatch, id]);

  const editClick = useCallback((): void => {
    onEditClick(item);
  }, [item, onEditClick]);

  const contextItems: IContextualMenuItem[] = [
    {
      key: "edit",
      onClick: editClick,
      text: "Edit",
    },
    {
      key: "complete-1-level",
      onClick: completeOnClick,
      text: "Mark as complete",
    },
    {
      key: "complete-2-level",
      onClick: completeWithChildrenOnClick,
      text: "Mark this and its children as complete",
    },
    {
      key: "delete",
      onClick: deleteSubjectOnClick,
      text: "Delete this",
    },
  ];

  return (
    <ContextualMenu
      items={contextItems}
      target={ev.target as HTMLElement}
      directionalHint={DirectionalHint.bottomCenter}
      isBeakVisible={false}
      onDismiss={onDismiss}
    />
  );
}
