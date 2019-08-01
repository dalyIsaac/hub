import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FocusZone,
  Stack,
  Text,
  TextField,
  Label,
  DatePicker,
  DefaultButton,
  IconButton,
  DirectionalHint,
} from "office-ui-fabric-react";
import { getTheme, mergeStyleSets } from "@uifabric/styling";

import { Item } from "../model/Subject";
import TitleInput from "../../TitleInput";
import SimpleListView from "./SimpleListView";
import { setSubjectName } from "../model/Name";
import { setSubjectDescription } from "../model/Description";
import { completeSubject, uncompleteSubject } from "../model/Completed";
import { deleteSubject } from "../model/Delete";
import { setSubjectDueDate } from "../model/Date";
import AppendChildren, { AppendChildrenHeight } from "./AppendChildren";
import SubjectListItem from "./ListItem/SubjectListItem";
import { Link } from "react-router-dom";
import { gotoSubject } from "../Routing";
import { State } from "../../Reducer";
import { removeChildView } from "../../views/model/RemoveChild";

interface SubjectProps {
  item: Item;

  /**
   * This should be an expression which can be evaluated by CSS calc()
   */
  listHeight?: string;

  showOpenButton?: boolean;
  showCloseButton?: boolean;
}

const theme = getTheme();
const border = "1px solid " + theme.palette.neutralTertiary;
const styles = mergeStyleSets({
  headerWrapper: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    display: "grid",
    gridTemplateColumns: "32px auto 32px",
  },
  header: {
    alignItems: "center",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    color: theme.palette.neutralLight,
    display: "flex",
    flexDirection: "column",
    gridColumn: "2",
    gridRow: "1",
    margin: -1,
    padding: 5,
    zIndex: 1,
  },
  headerOpenButton: {
    background: theme.palette.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 4,
    margin: 0,
    marginTop: 0,
    outline: "none",
    zIndex: 2,
  },
  headerCloseButton: {
    background: theme.palette.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 0,
    margin: 0,
    outline: "none",
    zIndex: 2,
    selectors: {
      "&:active": {
        backgroundColor: theme.palette.red,
        color: theme.palette.white,
        filter: "brightness(80%)",
        outline: "none",
      },
      "&:hover": {
        backgroundColor: theme.palette.red,
        color: theme.palette.white,
      },
    },
  },
  headerLink: {
    gridColumn: "3",
    gridRow: "1",
    outline: "none",
  },
  body: {
    padding: 10,
  },
  title: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingBottom: 5,
    paddingTop: 10,
  },
  description: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  date: {
    display: "flex",
    justifyContent: "space-between",
  },
  datePicker: {
    display: "flex",
    flexDirection: "row",
  },
  daysLeft: {
    display: "flex",
    justifyContent: "flex-end",
  },
  appendChildren: {
    background: theme.palette.white,
    border,
    width: "100%",
  },
  heroButton: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
});

function getDaysDifference(first: Date, second: Date): number {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.ceil(
    (second.valueOf() - first.valueOf()) / (1000 * 60 * 60 * 24),
  );
}

export default function SubjectComponent({
  item: { subject, id, viewId },
  listHeight,
  showOpenButton,
  showCloseButton,
}: SubjectProps): JSX.Element {
  const dispatch = useDispatch();
  const [name, setName] = useState(subject.name);
  const [description, setDescription] = useState(subject.description);

  const { subjects } = useSelector((state: State) => state);

  // Side effects update state with new props
  useEffect((): void => {
    setName(subject.name);
  }, [subject.name]);

  useEffect((): void => {
    setDescription(subject.description);
  }, [subject.description]);

  // Event handlers
  const setNameLocal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setName(e.target.value);
    },
    [],
  );

  const setNameRedux = useCallback((): void => {
    const newName = name || "Untitled";
    if (subject.name !== newName) {
      dispatch(setSubjectName(id, newName));
    }
    setName(newName);
  }, [dispatch, id, name, subject.name]);

  const setDescriptionLocal = useCallback((e: any, newValue?: string): void => {
    setDescription(newValue || "");
  }, []);

  const setDescriptionRedux = useCallback((): void => {
    if (subject.description !== description) {
      dispatch(setSubjectDescription(id, description));
    }
  }, [dispatch, id, description, subject.description]);

  const setDueDateRedux = useCallback(
    (date?: Date | null): void => {
      dispatch(setSubjectDueDate(id, date || undefined));
    },
    [dispatch, id],
  );

  const completeOnClick = useCallback((): void => {
    dispatch(completeSubject(id, 1));
  }, [dispatch, id]);
  const uncompleteOnClick = useCallback((): void => {
    dispatch(uncompleteSubject(id));
  }, [dispatch, id]);
  const clearDueDateOnClick = useCallback((): void => setDueDateRedux(), [
    setDueDateRedux,
  ]);

  const completeSubjectOnClick = useCallback((): void => {
    dispatch(completeSubject(id, 2));
  }, [dispatch, id]);

  const deleteSubjectOnClick = useCallback((): void => {
    dispatch(deleteSubject(id));
  }, [dispatch, id]);

  const removeChildViewOnClick = useCallback((): void => {
    if (viewId && id) {
      dispatch(removeChildView(viewId, id));
    }
  }, [dispatch, id, viewId]);

  const completeItem = {
    key: "complete-2-level",
    text: "Mark this and its children as complete",
    onClick: completeSubjectOnClick,
  };
  const deleteItem = {
    key: "delete",
    text: "Delete this",
    onClick: deleteSubjectOnClick,
  };

  const daysLeft = subject.dueDate
    ? getDaysDifference(new Date(), subject.dueDate)
    : "∞";

  let header;
  let heroButton;
  let backgroundColor;
  if (!subject.completed) {
    backgroundColor = theme.palette.green;
    header = (
      <Text className={styles.header}>
        Created {subject.created.toLocaleDateString()}
      </Text>
    );

    heroButton = (
      <DefaultButton
        primary
        text="Mark as complete"
        split={true}
        onClick={completeOnClick}
        menuProps={{
          directionalHint: DirectionalHint.bottomCenter,
          isBeakVisible: false,
          items: [completeItem, deleteItem],
        }}
      />
    );
  } else {
    backgroundColor = theme.palette.red;
    header = (
      <Text className={styles.header}>
        Completed {subject.completed.toLocaleDateString()}
      </Text>
    );

    heroButton = (
      <DefaultButton
        text="Mark as uncomplete"
        split={true}
        onClick={uncompleteOnClick}
        menuProps={{
          directionalHint: DirectionalHint.bottomCenter,
          isBeakVisible: false,
          items: [deleteItem],
        }}
        style={{ background: theme.palette.white }}
      />
    );
  }

  const headerOpenLabel = "Open " + subject.name;
  const headerCloseLabel = "Close " + subject.name;

  return (
    <FocusZone>
      <Stack verticalAlign={"center"}>
        <div className={styles.headerWrapper} style={{ backgroundColor }}>
          {showCloseButton ? (
            <IconButton
              styles={{ root: { width: "" } }}
              className={styles.headerCloseButton}
              iconProps={{ iconName: "Cancel" }}
              title={headerCloseLabel}
              ariaLabel={headerCloseLabel}
              onClick={removeChildViewOnClick}
            />
          ) : null}
          {header}
          {showOpenButton ? (
            <Link to={gotoSubject("grid", id)} className={styles.headerLink}>
              <IconButton
                styles={{ root: { width: "" } }}
                className={styles.headerOpenButton}
                iconProps={{ iconName: "OpenFile" }}
                title={headerOpenLabel}
                ariaLabel={headerOpenLabel}
              />
            </Link>
          ) : null}
        </div>

        <div className={styles.body}>
          <TitleInput
            textAlign="center"
            className={styles.title}
            value={name}
            onChange={setNameLocal}
            onBlur={setNameRedux}
          />
          <TextField
            multiline
            rows={3}
            value={description}
            onChange={setDescriptionLocal}
            onBlur={setDescriptionRedux}
            className={styles.description}
          />
          <div className={styles.date}>
            <Label>Due date:</Label>
            <div className={styles.datePicker}>
              <DatePicker
                value={subject.dueDate}
                onSelectDate={setDueDateRedux}
              />
              {subject.dueDate ? (
                <IconButton
                  iconProps={{ iconName: "cancel" }}
                  title="Clear date"
                  onClick={clearDueDateOnClick}
                />
              ) : null}
            </div>
          </div>
          <div className={styles.daysLeft}>
            <Label>
              {`${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`}
            </Label>
          </div>
          <div
            style={{
              minHeight: `calc((${listHeight}) + ${AppendChildrenHeight}px)`,
            }}
          >
            <SimpleListView
              parentId={id}
              order={subjects.dict[id].children.order}
              maxHeight={`calc(${listHeight})`}
              onRenderCell={SubjectListItem}
            />
            <AppendChildren parent={id} />
          </div>
          <div className={styles.heroButton}>{heroButton}</div>
        </div>
      </Stack>
    </FocusZone>
  );
}
