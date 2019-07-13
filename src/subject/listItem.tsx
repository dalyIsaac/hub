import React, { useRef, useState } from "react";
import { Subject } from "./model";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { ContextualMenu } from "office-ui-fabric-react/lib/ContextualMenu";

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
  checkbox: {
    margin: 8
  },
  content: {
    display: "flex",
    flexGrow: 2,
    paddingLeft: 8,
    paddingRight: 8
  },
  open: {
    color: theme.palette.white,
    background: theme.palette.themePrimary,
    fontSize: 18,
    cursor: "pointer",
    border: "none",
    outline: "none",
    margin: -1,
    height: 40,
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

interface ListItemProps {
  id: string;
  subject: Subject;
}

export default function ListItem({ id, subject }: ListItemProps): JSX.Element {
  const hostId = useRef(getId(id));
  const listItemRef = useRef(null);

  const [calloutVisible, _setCalloutVisible] = useState(false);
  function setCalloutVisible(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    _setCalloutVisible(!calloutVisible);
  }

  return (
    <div
      data-is-scrollable="true"
      onContextMenu={setCalloutVisible}
      ref={listItemRef}
    >
      <div className={styles.wrapper}>
        <Checkbox label={subject.name} className={styles.checkbox} />

        <div className={styles.content}>
          {/* // TODO: include custom content here. It should render below. */}
        </div>

        <TooltipHost content={"Open " + subject.name} id={hostId.current}>
          <button className={styles.open} aria-labelledby={hostId.current}>
            <Icon iconName="OpenFile" />
          </button>
        </TooltipHost>
      </div>

      {calloutVisible ? (
        <ContextualMenu
          isBeakVisible={false}
          onDismiss={setCalloutVisible}
          target={listItemRef}
          directionalHint={DirectionalHint.bottomRightEdge}
          items={[
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
          ]}
        />
      ) : null}
    </div>
  );
}

export function ListViewItem(props?: ListItemProps): JSX.Element | undefined {
  if (!props) {
    return;
  }

  const { id, subject } = props;
  return <ListItem id={id} subject={subject} />;
}
