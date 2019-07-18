import React, { useRef } from "react";
import {
  TooltipHost,
  Icon,
  getId,
  IContextualMenuItem,
} from "office-ui-fabric-react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { Item } from "../../model/Subject";
import { useDispatch } from "react-redux";
import { completeSubject, uncompleteSubject } from "../../model/Completed";
import { deleteSubject } from "../../model/Delete";
import { Link } from "react-router-dom";
import { removeChild } from "../../model/RemoveChild";
import ListItemBase from "./ListItemBase";
import { isUndefined } from "lodash";
import { setSubjectName } from "../../model/Title";

const theme = getTheme();
const styles = mergeStyleSets({
  open: {
    color: theme.palette.white,
    background: theme.palette.themePrimary,
    cursor: "pointer",
    border: "none",
    borderRadius: 2,
    outline: "none",
    margin: -1,
    marginBottom: -2,
    marginRight: -3,
    height: 40,
    width: 32,
    selectors: {
      "&:hover": {
        filter: "brightness(90%)",
      },
      "&:active": {
        filter: "brightness(80%)",
      },
    },
  },
});

function ListItem({ id, parent, subject }: Item): JSX.Element {
  const dispatch = useDispatch();
  const hostId = useRef(getId(id));

  const onChange = (e: any, checked?: boolean, level?: number) => {
    if (checked === true) {
      dispatch(completeSubject(id, level));
    } else {
      dispatch(uncompleteSubject(id));
    }
  };

  const onBlur = (newValue: string) => dispatch(setSubjectName(id, newValue));

  const contextItems: IContextualMenuItem[] = [
    {
      key: "complete-1-level",
      text: "Mark as complete",
      onClick: (e, item) => {
        if (item) {
          onChange(e, !item.checked, 1);
        }
      },
    },
    {
      key: "complete-2-level",
      text: "Mark this and its children as complete",
      onClick: (e, item) => {
        if (item) {
          onChange(e, !item.checked, 2);
        }
      },
    },
    {
      key: "remove",
      text: "Remove this as a child",
      onClick: () => dispatch(removeChild(id, parent!)),
    },
    {
      key: "delete",
      text: "Delete this",
      onClick: () => dispatch(deleteSubject(id)),
    },
  ];

  const button = (
    <TooltipHost content={"Open " + subject.name} id={hostId.current}>
      <Link to={`/${id}`}>
        <button className={styles.open} aria-labelledby={hostId.current}>
          <Icon iconName="OpenFile" />
        </button>
      </Link>
    </TooltipHost>
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
