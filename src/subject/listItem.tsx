import React from "react";
import { Subject } from "./model";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { mergeStyleSets, getTheme } from "@uifabric/styling";

const theme = getTheme();

const border = "1px solid " + theme.palette.neutralTertiary;

const styles = mergeStyleSets({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    border,
    borderRadius: 2,
    marginTop: 1,
    marginBottom: 1
  },
  checkboxWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 2,
    paddingRight: 8,
    borderRight: border
  },
  checkbox: {
    marginLeft: 6
  },
  content: {
    display: "flex",
    alignItems: "center",
    flexGrow: 2,
    paddingLeft: 8,
    paddingRight: 8
  },
  delete: {
    color: theme.palette.white,
    background: theme.palette.red,
    cursor: "pointer",
    border: "none",
    outline: "none",
    margin: -1,
    selectors: {
      "&:hover": {
        filter: "brightness(90%)"
      },
      "&:active": {
        filter: "brightness(80%)"
      }
    }
  }
});

export default function(subject?: Subject): JSX.Element | undefined {
  if (!subject) {
    return;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.checkboxWrapper}>
        <IconButton iconProps={{ iconName: "ChevronUp" }} />
        <Checkbox label={"1 item"} className={styles.checkbox} />
        <IconButton iconProps={{ iconName: "ChevronDown" }} />
      </div>

      <div className={styles.content}>
        <Label>{subject.name}</Label>
      </div>

      <button className={styles.delete}>
        <Icon iconName="RecycleBin" />
      </button>
    </div>
  );
}
