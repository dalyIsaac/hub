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

  const removeChildOnClick = useCallback((): void => {
    dispatch(removeChild(id, parent!));
  }, [dispatch, id, parent]);

  const deleteSubjectOnClick = useCallback((): void => {
    dispatch(deleteSubject(id));
  }, [dispatch, id]);

  const contextItems: IContextualMenuItem[] = [
    {
      key: "complete-1-level",
      text: "Mark as complete",
      onClick: completeOnClick,
    },
    {
      key: "complete-2-level",
      text: "Mark this and its children as complete",
      onClick: completeWithChildrenOnClick,
    },
    {
      key: "remove",
      text: "Remove this as a child",
      onClick: removeChildOnClick,
    },
    {
      key: "delete",
      text: "Delete this",
      onClick: deleteSubjectOnClick,
    },
  ];

  const buttonLabel = "Open " + subject.name;
  const button = (
    <Link to={`/${id}`}>
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
