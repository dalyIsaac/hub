import React, { useState } from "react";
import { Subject } from "../model/Subject";
import { FocusZone } from "office-ui-fabric-react/lib/FocusZone";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { Text } from "office-ui-fabric-react/lib/Text";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Label } from "office-ui-fabric-react/lib/Label";
import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";
import { getTheme, mergeStyleSets } from "@uifabric/styling";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout";

import Title from "./Title";
import ListView from "./ListView";
import { useDispatch } from "react-redux";
import { updateSubjectNameAction } from "../model/Title";
import { updateSubjectDescriptionAction } from "../model/Description";

interface SubjectProps {
  subject: Subject;
  id: string;
}

const theme = getTheme();
const styles = mergeStyleSets({
  header: {
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.neutralLight,
    padding: 5,
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
  },
  description: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  date: {
    display: "flex",
    justifyContent: "space-between",
  },
  daysLeft: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export const contextItems = [
  {
    key: "complete-1-level",
    text: "Mark as complete",
  },
  {
    key: "complete-2-level",
    text: "Mark this and its children as complete",
  },
  {
    key: "complete-insane",
    text: "Mark this and every descendant as complete",
  },
  {
    key: "delete",
    text: "Delete this",
  },
];

export default function({ subject, id }: SubjectProps): JSX.Element {
  const dispatch = useDispatch();
  const [name, updateName] = useState(subject.name);
  const [description, updateDescription] = useState(subject.description || "");

  const updateTitleLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateName(e.target.value);
  };
  const updateTitleRedux = () => {
    if (subject.name !== name) {
      dispatch(updateSubjectNameAction(id, name));
    }
  };
  const updateDescriptionLocal = (e: any, newValue?: string) => {
    updateDescription(newValue || "");
  };
  const updateDescriptionRedux = () => {
    if (subject.description !== description) {
      dispatch(updateSubjectDescriptionAction(id, description));
    }
  };

  const daysLeft = subject.dueDate
    ? new Date().getDate() - subject.dueDate.getDate()
    : "∞";
  return (
    <FocusZone>
      <Stack verticalAlign={"center"}>
        <Text className={styles.header}>
          Created {subject.created.toLocaleString()}
        </Text>

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
            <DatePicker value={subject.dueDate} />
          </div>
          <div className={styles.daysLeft}>
            <Label>{`${daysLeft} days left`}</Label>
          </div>
          <ListView id={id} />
          <DefaultButton
            primary
            text="Mark as complete"
            style={{ marginTop: 10 }}
            menuProps={{
              directionalHint: DirectionalHint.bottomCenter,
              isBeakVisible: false,
              items: contextItems,
            }}
          />
        </div>
      </Stack>
    </FocusZone>
  );
}
