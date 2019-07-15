import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FocusZone } from "office-ui-fabric-react/lib/FocusZone";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { Text } from "office-ui-fabric-react/lib/Text";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Label } from "office-ui-fabric-react/lib/Label";
import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";
import { getTheme, mergeStyleSets } from "@uifabric/styling";
import { DefaultButton, IconButton } from "office-ui-fabric-react/lib/Button";
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout";

import { Subject } from "../model/Subject";
import Title from "./Title";
import ListView from "./ListView";
import { setSubjectName } from "../model/Title";
import { setSubjectDescription } from "../model/Description";
import { completeSubject, uncompleteSubject } from "../model/Completed";
import { deleteSubject } from "../model/Delete";
import { setSubjectDueDate } from "../model/Date";

interface SubjectProps {
  subject: Subject;
  id: string;
}

const theme = getTheme();
const styles = mergeStyleSets({
  header: {
    color: theme.palette.neutralLight,
    padding: 5,
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

export default function({ subject, id }: SubjectProps): JSX.Element {
  const dispatch = useDispatch();
  const [name, setName] = useState(subject.name);
  const [description, setDescription] = useState(subject.description || "");

  const updateTitleLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value || "Untitled");
  };
  const updateTitleRedux = () => {
    if (subject.name !== name) {
      dispatch(setSubjectName(id, name));
    }
  };
  const updateDescriptionLocal = (e: any, newValue?: string) => {
    setDescription(newValue || "");
  };
  const updateDescriptionRedux = () => {
    if (subject.description !== description) {
      dispatch(setSubjectDescription(id, description));
    }
  };
  const updateDueDateRedux = (date?: Date | null) => {
    dispatch(setSubjectDueDate(id, date || undefined));
  };

  const completeOnClick = () => dispatch(completeSubject(id, 1));
  const uncompleteOnClick = () => dispatch(uncompleteSubject(id));
  const clearDueDateOnClick = () => {
    updateDueDateRedux();
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
      />
    );
  }

  return (
    <FocusZone>
      <Stack verticalAlign={"center"}>
        {header}

        <div className={styles.body}>
          <Title
            className={styles.title}
            value={name}
            onChange={updateTitleLocal}
            onBlur={updateTitleRedux}
          />
          <TextField
            multiline
            rows={3}
            value={description}
            onChange={updateDescriptionLocal}
            onBlur={updateDescriptionRedux}
            className={styles.description}
          />
          <div className={styles.date}>
            <Label>Due date:</Label>
            <div className={styles.datePicker}>
              <DatePicker
                value={subject.dueDate}
                onSelectDate={updateDueDateRedux}
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
            <Label>{`${daysLeft} days left`}</Label>
          </div>
          <ListView id={id} />
          <div className={styles.heroButton}>{heroButton}</div>
        </div>
      </Stack>
    </FocusZone>
  );
}
