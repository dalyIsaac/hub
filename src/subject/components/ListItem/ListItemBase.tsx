import React, { useState, useRef } from "react";
import {
  getTheme,
  mergeStyleSets,
  Checkbox,
  ContextualMenu,
  DirectionalHint,
  ICheckboxProps,
  IContextualMenuItem,
} from "office-ui-fabric-react";

interface ListItemBaseProps {
  contextMenuItems?: IContextualMenuItem[];
  key?: string | number;
  children?: JSX.Element;
  onCheckboxChange: ICheckboxProps["onChange"];
  button?: JSX.Element;
  checked: boolean;
  label: string;
}

const theme = getTheme();
const border = "1px solid " + theme.palette.neutralTertiary;
const styles = mergeStyleSets({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    border,
    borderRadius: 2,
    marginBottom: 2,
  },
  checkbox: {
    margin: 8,
  },
  content: {
    display: "flex",
    flexGrow: 2,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default function({
  onCheckboxChange,
  key,
  children,
  contextMenuItems,
  button,
  checked,
  label,
}: ListItemBaseProps) {
  const target = useRef(null);
  const [menuVisible, _setMenuVisible] = useState(false);
  function setCalloutVisible(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    _setMenuVisible(!menuVisible);
  }

  return (
    <div
      data-is-focusable={true}
      onContextMenu={setCalloutVisible}
      ref={target}
      key={key}
    >
      <div className={styles.wrapper}>
        <Checkbox
          checked={checked}
          label={label}
          className={styles.checkbox}
          onChange={onCheckboxChange}
        />

        <div className={styles.content}>{children}</div>

        {button || null}
      </div>

      {contextMenuItems && menuVisible ? (
        <ContextualMenu
          isBeakVisible={false}
          onDismiss={setCalloutVisible}
          target={target}
          directionalHint={DirectionalHint.bottomRightEdge}
          items={contextMenuItems}
        />
      ) : null}
    </div>
  );
}
