import React from "react";

import { getTheme, mergeStyleSets } from "@uifabric/styling";
import { FontSizes } from "@uifabric/fluent-theme/lib/fluent/FluentType";

interface NameProps {
  className: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const theme = getTheme();
const styles = mergeStyleSets({
  title: {
    border: "1px solid transparent",
    borderRadius: 0,
    fontSize: FontSizes.size28,
    outline: "none",
    paddingBottom: 4,
    textAlign: "center",
    width: "80%",
    selectors: {
      "&:focus": {
        borderBottom: "1px solid " + theme.palette.neutralTertiary,
        outline: "none",
      },
      "&:hover": {
        borderBottom: "1px solid " + theme.palette.neutralTertiary,
        outline: "none",
      },
    },
  },
});

export default function Name({
  value,
  className,
  onBlur,
  onChange,
}: NameProps): JSX.Element {
  return (
    <div className={className}>
      <input
        className={styles.title}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
}
