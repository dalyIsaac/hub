import React, { useState, useRef, useEffect } from "react";
import {
  getTheme,
  mergeStyleSets,
  Checkbox,
  ContextualMenu,
  DirectionalHint,
  ICheckboxProps,
  IContextualMenuItem,
  TextField,
} from "office-ui-fabric-react";

interface ListItemBaseProps {
  contextMenuItems?: IContextualMenuItem[];
  key?: string | number;
  children?: JSX.Element;
  onCheckboxChange: ICheckboxProps["onChange"];
  button?: JSX.Element;
  checked: boolean;
  label: string;
  editable?: boolean;
  onEditableBlur?: (value: string) => void;
}

const theme = getTheme();

export const gridTemplateColumns = "auto 1px 32px";
export const border = "1px solid " + theme.palette.neutralTertiary;

const styles = mergeStyleSets({
  wrapper: {
    display: "grid",
    gridTemplateColumns,
    gridTemplateRows: "auto auto",
    border,
    borderRadius: 2,
    marginBottom: 2,
  },
  checkboxWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  divider: {
    gridColumn: "2",
    background: theme.palette.neutralTertiary,
    width: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    gridColumn: "3",
  },
  content: {
    gridRow: "2",
    gridColumn: "1 / 3",
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
  editable,
  onEditableBlur,
}: ListItemBaseProps) {
  const target = useRef(null);
  const [localLabel, _setLocalLabel] = useState(label);
  const [menuVisible, _setMenuVisible] = useState(false);

  useEffect(() => {
    _setLocalLabel(label);
  }, [label]);

  function setCalloutVisible(e: React.MouseEvent<HTMLDivElement>): void {
    e.preventDefault();
    _setMenuVisible(!menuVisible);
  }

  function setLocalLabel(e: any, newValue?: string): void {
    _setLocalLabel(newValue || "");
  }

  const onBlur = () => {
    if (onEditableBlur) {
      const newLabel = localLabel || "Untitled";
      onEditableBlur(newLabel);
      _setLocalLabel(newLabel);
    }
  };

  return (
    <div
      data-is-focusable={true}
      onContextMenu={setCalloutVisible}
      ref={target}
      key={key}
    >
      <div className={styles.wrapper}>
        <div className={styles.checkboxWrapper}>
          <Checkbox
            checked={checked}
            label={editable ? undefined : label}
            className={styles.checkbox}
            onChange={onCheckboxChange}
          />

          {editable ? (
            <TextField
              value={localLabel}
              borderless={true}
              onChange={onEditableBlur ? setLocalLabel : undefined}
              onBlur={onBlur}
            />
          ) : null}
        </div>
        <div className={styles.content}>{children}</div>

        {!!button ? <span className={styles.divider} /> : null}
        <div className={styles.button}>{button || null}</div>
      </div>

      <ContextualMenu
        hidden={!(contextMenuItems && menuVisible)}
        isBeakVisible={false}
        onDismiss={setCalloutVisible}
        target={target}
        directionalHint={DirectionalHint.bottomRightEdge}
        items={contextMenuItems!}
      />
    </div>
  );
}
