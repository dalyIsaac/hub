import { IconButton, getTheme, mergeStyleSets } from "office-ui-fabric-react";
import React, { useCallback } from "react";

import { Item } from "../../model/Subject";
import { Link } from "react-router-dom";
import { gotoSubject } from "../../Routing";
import { removeSubjectFromView } from "../../../model/Views/RemoveSubjectFromView";
import { useDispatch } from "react-redux";

const theme = getTheme();
const styles = mergeStyleSets({
  rowButton: {
    selectors: {
      "&:active": {
        filter: "brightness(80%)",
        outline: "none",
      },
      "&:hover": {
        filter: "brightness(90%)",
        outline: "none",
      },
    },
  },
  rowButtonWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  subjectWrapper: {
    backgroundColor: theme.palette.white,
    border: "1px solid " + theme.palette.neutralTertiary,
    borderRadius: 4,
  },
});

interface ListViewButtonsProps {
  item: Item;
  openModal: (item: Item) => void;
  showCloseButton?: boolean;
}

export default function ListViewButtons({
  item,
  openModal,
  showCloseButton,
}: ListViewButtonsProps): JSX.Element {
  const dispatch = useDispatch();

  const openModalOnClick = useCallback((): void => {
    openModal(item);
  }, [item, openModal]);

  const removeChildViewOnClick = useCallback((): void => {
    if (item.viewId && item.id) {
      dispatch(removeSubjectFromView(item.viewId, item.id));
    }
  }, [dispatch, item]);

  const openLabel = "Open " + item.subject.name;
  const editLabel = "Edit " + item.subject.name;
  const closeLabel = "Close " + item.subject.name;

  return (
    <div className={styles.rowButtonWrapper}>
      {showCloseButton ? (
        <IconButton
          onClick={removeChildViewOnClick}
          styles={{ root: { width: "" } }}
          className={styles.rowButton}
          iconProps={{ iconName: "Cancel" }}
          title={closeLabel}
          ariaLabel={closeLabel}
        />
      ) : null}
      <IconButton
        onClick={openModalOnClick}
        styles={{ root: { width: "" } }}
        className={styles.rowButton}
        iconProps={{ iconName: "Edit" }}
        title={editLabel}
        ariaLabel={editLabel}
      />
      <Link to={gotoSubject("list", item.id)}>
        <IconButton
          styles={{ root: { width: "" } }}
          className={styles.rowButton}
          iconProps={{ iconName: "OpenFile" }}
          title={openLabel}
          ariaLabel={openLabel}
        />
      </Link>
    </div>
  );
}
