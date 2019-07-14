import React from "react";
import { Subject } from "./model";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { FocusZone } from "office-ui-fabric-react/lib/FocusZone";
import { Text } from "office-ui-fabric-react/lib/Text";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Label } from "office-ui-fabric-react/lib/Label";
import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";
import { getTheme, mergeStyleSets } from "@uifabric/styling";
import Title from "../components/title";
import ListView from "./listView";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout";

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
    marginBottom: 10,
    selectors: {
      "&:focus": {
        outline: "none",
        border: "none"
      }
    }
  },
  title: {
    paddingTop: 10,
    paddingBottom: 5
  },
  description: {
    paddingTop: 10,
    paddingBottom: 10
  },
  date: {
    display: "flex",
    justifyContent: "space-between"
  },
  daysLeft: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

export const contextItems = [
  {
    key: "complete-1-level",
    text: "Mark as complete"
  },
  {
    key: "complete-2-level",
    text: "Mark this and its children as complete"
  },
  {
    key: "complete-insane",
    text: "Mark this and every descendant as complete"
  },
  {
    key: "delete",
    text: "Delete this"
  }
];

export default function({ subject, id }: SubjectProps): JSX.Element {
  const updateTitle = () => {};
  const updateDescription = () => {};

  const daysLeft = subject.dueDate
    ? new Date().getDate() - subject.dueDate.getDate()
    : "∞";
  return (
    <FocusZone>
      <Stack verticalAlign={"center"}>
        <Text className={styles.header}>
          Created {subject.created.toLocaleString()}
        </Text>
        <Title
          className={styles.title}
          value={subject.name}
          onChange={updateTitle}
        />
        <TextField
          multiline
          rows={3}
          value={subject.description}
          onChange={updateDescription}
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
          style={{ marginTop: 10, marginBottom: 10 }}
          menuProps={{
            directionalHint: DirectionalHint.bottomRightEdge,
            isBeakVisible: false,
            items: contextItems
          }}
        />
      </Stack>
    </FocusZone>
  );
}
