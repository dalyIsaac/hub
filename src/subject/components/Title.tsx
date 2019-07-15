import React from "react";

import { getTheme, mergeStyleSets } from "@uifabric/styling";
import { FontSizes } from "@uifabric/fluent-theme/lib/fluent/FluentType";

interface TitleProps {
  className: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const theme = getTheme();
const styles = mergeStyleSets({
  title: {
    textAlign: "center",
    fontSize: FontSizes.size28,
    border: "1px solid transparent",
    outline: "none",
    borderRadius: 0,
    paddingBottom: 4,
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

export default function({
  value,
  className,
  onBlur,
  onChange,
}: TitleProps): JSX.Element {
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
