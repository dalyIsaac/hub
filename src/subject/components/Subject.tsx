import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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

import { Subject } from "../model/Subject";
import Name from "./Name";
import ListView from "./ListView";
import { setSubjectName } from "../model/Name";
import { setSubjectDescription } from "../model/Description";
import { completeSubject, uncompleteSubject } from "../model/Completed";
import { deleteSubject } from "../model/Delete";
import { setSubjectDueDate } from "../model/Date";
import AppendChildren, { AppendChildrenHeight } from "./AppendChildren";
import SubjectListItem from "./ListItem/SubjectListItem";
import { Link } from "react-router-dom";

interface SubjectProps {
  subject: Subject;
  id: string;

  /**
   * This should be an expression which can be evaluated by CSS calc()
   */
  listHeight?: string;

  showOpenButton?: boolean;
}

const theme = getTheme();
const border = "1px solid " + theme.palette.neutralTertiary;
const styles = mergeStyleSets({
  headerWrapper: {
    display: "grid",
    gridTemplateColumns: "auto 32px",
  },
  header: {
    color: theme.palette.neutralLight,
    padding: 5,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    gridRow: "1",
    zIndex: 1,
    gridColumn: "1 / 3",
    margin: -1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    selectors: {
      "&:focus": {
        outline: "none",
        border: "none",
      },
    },
  },
  headerLink: {
    gridColumn: "2",
    gridRow: "1",
  },
  headerButton: {
    background: theme.palette.white,
    borderTop: border,
    borderRight: border,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: -1,
    marginRight: -1,
    marginBottom: -1,
    marginLeft: 0,
    zIndex: 2,
  },
  body: {
    padding: 10,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  description: {
    paddingTop: 10,
    paddingBottom: 10,
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
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

function getDaysDifference(first: Date, second: Date) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.ceil(
    (second.valueOf() - first.valueOf()) / (1000 * 60 * 60 * 24),
  );
}

export default function({
  subject,
  id,
  listHeight,
  showOpenButton,
}: SubjectProps): JSX.Element {
  const dispatch = useDispatch();
  const [name, setName] = useState(subject.name);
  const [description, setDescription] = useState(subject.description);

  // Side effects update state with new props
  useEffect(() => {
    setName(subject.name);
  }, [subject.name]);

  useEffect(() => {
    setDescription(subject.description);
  }, [subject.description]);

  // Event handlers
  const setNameLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const setNameRedux = () => {
    const newName = name || "Untitled";
    if (subject.name !== newName) {
      dispatch(setSubjectName(id, newName));
    }
    setName(newName);
  };
  const setDescriptionLocal = (e: any, newValue?: string) => {
    setDescription(newValue || "");
  };
  const setDescriptionRedux = () => {
    if (subject.description !== description) {
      dispatch(setSubjectDescription(id, description));
    }
  };
  const setDueDateRedux = (date?: Date | null) => {
    dispatch(setSubjectDueDate(id, date || undefined));
  };

  const completeOnClick = () => dispatch(completeSubject(id, 1));
  const uncompleteOnClick = () => dispatch(uncompleteSubject(id));
  const clearDueDateOnClick = () => {
    setDueDateRedux();
  };

  const completeItem = {
    key: "complete-2-level",
    text: "Mark this and its children as complete",
    onClick: () => {
      dispatch(completeSubject(id, 2));
    },
  };
  const deleteItem = {
    key: "delete",
    text: "Delete this",
    onClick: () => {
      dispatch(deleteSubject(id));
    },
  };

  const daysLeft = subject.dueDate
    ? getDaysDifference(new Date(), subject.dueDate)
    : "∞";

  let header;
  let heroButton;
  if (!subject.completed) {
    header = (
      <Text
        className={styles.header}
        style={{ backgroundColor: theme.palette.green }}
      >
        Created {subject.created.toLocaleString()}
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
    header = (
      <Text
        className={styles.header}
        style={{ backgroundColor: theme.palette.red }}
      >
        Completed {subject.completed.toLocaleString()}
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

  return (
    <FocusZone>
      <Stack verticalAlign={"center"}>
        <div className={styles.headerWrapper}>
          {header}
          {showOpenButton ? (
            <Link to={`/${id}`} className={styles.headerLink}>
              <IconButton
                styles={{ root: { width: "" } }}
                className={styles.headerButton}
                iconProps={{ iconName: "OpenFile" }}
                title={headerOpenLabel}
                ariaLabel={headerOpenLabel}
              />
            </Link>
          ) : null}
        </div>

        <div className={styles.body}>
          <Name
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
            <ListView
              subjectId={id}
              maxHeight={`calc(${listHeight})`}
              onRenderCell={SubjectListItem}
              getChildren={true}
            />
            <AppendChildren parent={id} />
          </div>
          <div className={styles.heroButton}>{heroButton}</div>
        </div>
      </Stack>
    </FocusZone>
  );
}
