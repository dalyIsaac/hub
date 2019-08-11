import React, { useState, useRef, useEffect, useCallback } from "react";
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
    border,
    borderRadius: 2,
    display: "grid",
    gridTemplateColumns,
    gridTemplateRows: "auto auto",
    marginBottom: 2,
  },
  checkboxWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  checkbox: {
    margin: 8,
  },
  divider: {
    background: theme.palette.neutralTertiary,
    gridColumn: "2",
    marginBottom: 8,
    marginTop: 8,
    width: 1,
  },
  button: {
    gridColumn: "3",
  },
  content: {
    gridColumn: "1 / 3",
    gridRow: "2",
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default function ListItemBase({
  button,
  checked,
  children,
  contextMenuItems,
  editable,
  key,
  label,
  onCheckboxChange,
  onEditableBlur,
}: ListItemBaseProps): JSX.Element {
  const target = useRef(null);
  const [localLabel, _setLocalLabel] = useState(label);
  const [menuVisible, _setMenuVisible] = useState(false);

  useEffect((): void => {
    _setLocalLabel(label);
  }, [label]);

  const setCalloutVisible = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      e.preventDefault();
      _setMenuVisible(!menuVisible);
    },
    [menuVisible],
  );

  const setLocalLabel = useCallback((e: any, newValue?: string): void => {
    _setLocalLabel(newValue || "");
  }, []);

  const onBlur = useCallback((): void => {
    if (onEditableBlur) {
      const newLabel = localLabel || "Untitled";
      onEditableBlur(newLabel);
      _setLocalLabel(newLabel);
    }
  }, [localLabel, onEditableBlur]);

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

        {button ? <span className={styles.divider} /> : null}
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
