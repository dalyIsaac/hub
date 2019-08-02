import React, { useCallback } from "react";
import { IContextualMenuItem, IconButton } from "office-ui-fabric-react";
import { mergeStyleSets } from "@uifabric/styling";
import { Item } from "../../model/Subject";
import { useDispatch } from "react-redux";
import { completeSubject, uncompleteSubject } from "../../model/Completed";
import { deleteSubject } from "../../model/Delete";
import { Link } from "react-router-dom";
import { removeChild } from "../../model/RemoveChild";
import ListItemBase from "./ListItemBase";
import { isUndefined } from "lodash";
import { setSubjectName } from "../../model/Name";
import { gotoSubject } from "../../Routing";

const styles = mergeStyleSets({
  open: {
    height: 40,
    width: "100%",
  },
});

function ListItem({ id, parent, subject }: Item): JSX.Element {
  const dispatch = useDispatch();

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

  const onBlur = useCallback(
    (newValue: string): void => {
      dispatch(setSubjectName(id, newValue || "Untitled"));
    },
    [dispatch, id],
  );

  const completeOnClick = useCallback(
    (e: any, item?: IContextualMenuItem): void => {
      if (item) {
        onChange(e, true, 1);
      }
    },
    [onChange],
  );

  const completeWithChildrenOnClick = useCallback(
    (e: any, item?: IContextualMenuItem): void => {
      if (item) {
        onChange(e, true, 2);
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

  const removeChildOnClick = useCallback((): void => {
    dispatch(removeChild(id, parent!));
  }, [dispatch, id, parent]);

  const deleteSubjectOnClick = useCallback((): void => {
    dispatch(deleteSubject(id));
  }, [dispatch, id]);

  const completeContextItems = [
    {
      iconProps: { iconName: "Completed" },
      key: "complete-1-level",
      onClick: completeOnClick,
      text: "Mark as complete",
    },
    {
      iconProps: { iconName: "CompletedSolid" },
      key: "complete-2-level",
      onClick: completeWithChildrenOnClick,
      text: "Mark this and its children as complete",
    },
  ];

  const uncompleteContextItems = [
    {
      iconProps: { iconName: "Blocked2" },
      key: "uncomplete",
      onClick: uncompleteOnClick,
      text: "Mark as incomplete",
    },
  ];

  const contextItems: IContextualMenuItem[] = [
    ...(subject.completed ? uncompleteContextItems : completeContextItems),
    {
      iconProps: { iconName: "Remove" },
      key: "remove",
      onClick: removeChildOnClick,
      text: "Remove this as a child",
    },
    {
      iconProps: { iconName: "Delete" },
      key: "delete",
      onClick: deleteSubjectOnClick,
      text: "Delete this",
    },
  ];

  const buttonLabel = "Open " + subject.name;
  const button = (
    <Link to={gotoSubject("grid", id)} tabIndex={-1}>
      <IconButton
        className={styles.open}
        iconProps={{ iconName: "OpenFile" }}
        ariaLabel={buttonLabel}
        title={buttonLabel}
      />
    </Link>
  );
  return (
    <ListItemBase
      editable={true}
      onEditableBlur={onBlur}
      checked={!!subject.completed}
      label={subject.name}
      onCheckboxChange={onChange}
      contextMenuItems={contextItems}
      button={button}
    />
  );
}

export default function SubjectListItem(props?: Item): JSX.Element | undefined {
  if (!props || isUndefined(props.parent)) {
    return;
  }

  return <ListItem {...props} key={props.id} />;
}
