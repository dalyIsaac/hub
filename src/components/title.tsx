import React from "react";

import { getTheme, mergeStyleSets } from "@uifabric/styling";
import { FontSizes } from "@uifabric/fluent-theme/lib/fluent/FluentType";

interface TitleProps {
  value: string;
  onChange: ((event: React.FormEvent<HTMLInputElement>) => void) | undefined;
}

const theme = getTheme();
const styles = mergeStyleSets({
  title: {
    textAlign: "center",
    border: "1px solid " + theme.palette.neutralTertiary,
    fontSize: FontSizes.size28,
    paddingTop: 16,
    paddingBottom: 16,
    selectors: {
      "&:focus": {
        border: "1px solid " + theme.palette.themePrimary,
        outline: "none"
      },
      "&:focus-within": {
        border: "1px solid " + theme.palette.themePrimary,
        outline: "none"
      },
      "&:hover": {
        border: "1px solid " + theme.palette.neutralPrimary,
        outline: "none"
      }
    }
  }
});

export default function({ value, onChange }: TitleProps): JSX.Element {
  return <input className={styles.title} onChange={onChange} value={value} />;
}
