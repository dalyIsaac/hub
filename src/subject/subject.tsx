import React from "react";
import { Subject } from "./model";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { FocusZone } from "office-ui-fabric-react/lib/FocusZone";
import { Text } from "office-ui-fabric-react/lib/Text";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { getTheme, mergeStyleSets } from "@uifabric/styling";
import Title from "../components/title";

interface SubjectProps {
  subject: Subject;
}

const theme = getTheme();
const styles = mergeStyleSets({
  header: {
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.neutralLight,
    padding: 4,
    selectors: {
      "&:focus": {
        outline: "none",
        border: "none"
      }
    }
  }
});

export default function({ subject }: SubjectProps): JSX.Element {
  const updateTitle = () => {};
  const updateDescription = () => {};

  return (
    <FocusZone>
      <Stack verticalAlign={"center"}>
        <Text className={styles.header}>
          Created {subject.created.toLocaleString()}
        </Text>
        <Title value={subject.name} onChange={updateTitle} />
        <TextField
          multiline
          rows={3}
          value={subject.description}
          onChange={updateDescription}
        />
      </Stack>
    </FocusZone>
  );
}
