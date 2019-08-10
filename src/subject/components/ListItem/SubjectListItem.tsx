import { IContextualMenuItem, IconButton } from "office-ui-fabric-react";
import React, { useCallback } from "react";
import {
  completeItem,
  completeWithChildrenItem,
  deleteItem,
  removeItem,
  uncompleteItem,
} from "../SubjectButtonsProps";
import {
  completeSubject,
  uncompleteSubject,
} from "../../model/CompleteSubject";

import { Item } from "../../model/Subject";
import { Link } from "react-router-dom";
import ListItemBase from "./ListItemBase";
import { deleteSubject } from "../../model/DeleteSubject";
import { gotoSubject } from "../../Routing";
import { isUndefined } from "lodash";
import { mergeStyleSets } from "@uifabric/styling";
import { removeChildSubjectFromSubject } from "../../model/RemoveChildSubjectFromSubject";
import { setSubjectName } from "../../model/SetSubjectName";
import { useDispatch } from "react-redux";

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
    dispatch(removeChildSubjectFromSubject(id, parent!));
  }, [dispatch, id, parent]);

  const deleteSubjectOnClick = useCallback((): void => {
    dispatch(deleteSubject(id));
  }, [dispatch, id]);

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
    ...(subject.completed ? uncompleteContextItems : completeContextItems),
    {
      ...removeItem,
      onClick: removeChildOnClick,
    },
    {
      ...deleteItem,
      onClick: deleteSubjectOnClick,
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
