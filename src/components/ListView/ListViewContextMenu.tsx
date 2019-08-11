import {
  ContextualMenu,
  DirectionalHint,
  IContextualMenuItem,
  IContextualMenuProps,
} from "office-ui-fabric-react";
import React, { useCallback } from "react";
import {
  completeItem,
  completeWithChildrenItem,
  uncompleteItem,
} from "../SubjectButtonsProps";
import {
  completeSubject,
  uncompleteSubject,
} from "../../model/Subject/CompleteSubject";

import { Item } from "../../model/Subject";
import { deleteSubject } from "../../model/Subject/DeleteSubject";
import { removeSubjectFromView } from "../../model/Views/RemoveSubjectFromView";
import { useDispatch } from "react-redux";

export interface ListViewContextMenuProps {
  item: Item;
  ev: Event;
  showCloseButton?: boolean;
  onEditClick: (item: Item) => void;
  onDismiss: IContextualMenuProps["onDismiss"];
}

export default function ListViewContextMenu({
  item,
  showCloseButton,
  ev,
  onDismiss,
  onEditClick,
}: ListViewContextMenuProps): JSX.Element {
  const dispatch = useDispatch();
  const { id, viewId } = item;

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

  const uncompleteOnClick = useCallback(
    (e: any, item?: IContextualMenuItem): void => {
      if (item) {
        onChange(e, false);
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

  const removeChildViewOnClick = useCallback((): void => {
    if (viewId && id) {
      dispatch(removeSubjectFromView(viewId, id));
    }
  }, [dispatch, id, viewId]);

  const completeContextItems = [
    {
      ...completeItem,
      onClick: completeOnClick,
    },
    {
      ...completeWithChildrenItem,
      onClick: completeWithChildrenOnClick,
    },
  ];

  const uncompleteContextItems = [
    {
      ...uncompleteItem,
      onClick: uncompleteOnClick,
    },
  ];

  const contextItems: IContextualMenuItem[] = [
    {
      iconProps: { iconName: "Edit" },
      key: "edit",
      onClick: editClick,
      text: "Edit",
    },
    ...(item.subject.completed ? uncompleteContextItems : completeContextItems),
    {
      iconProps: { iconName: "Delete" },
      key: "delete",
      onClick: deleteSubjectOnClick,
      text: "Delete this",
    },
  ];

  if (showCloseButton) {
    contextItems.push({
      iconProps: { iconName: "Cancel" },
      key: "removeChildView",
      onClick: removeChildViewOnClick,
      text: "Remove this subject from this view",
    });
  }

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
