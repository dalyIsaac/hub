import React, { useState, useCallback } from "react";
import { Item } from "../model/Subject";
import { gotoSubject } from "../../Routing";
import SubjectComponent from "./Subject";
import { Link } from "react-router-dom";
import {
  IconButton,
  Modal,
  getTheme,
  mergeStyleSets,
  DefaultButton,
} from "office-ui-fabric-react";

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
}

export default function ListViewButtons({
  item,
}: ListViewButtonsProps): JSX.Element {
  const [showModal, setModalVisible] = useState(false);
  const dismissModal = useCallback((): void => {
    setModalVisible(false);
  }, []);
  const openModal = useCallback((): void => {
    setModalVisible(true);
  }, []);

  const openLabel = "Open " + item.subject.name;
  const editLabel = "Edit " + item.subject.name;
  return (
    <div className={styles.rowButtonWrapper}>
      <IconButton
        onClick={openModal}
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
      <Modal
        isOpen={showModal}
        onDismiss={dismissModal}
        styles={{
          main: {
            backgroundColor: "none",
            border: "1px solid transparent",
            borderRadius: 4,
          },
        }}
      >
        <div className={styles.subjectWrapper}>
          <SubjectComponent
            id={item.id}
            subject={item.subject}
            showOpenButton={true}
          />
        </div>
      </Modal>
    </div>
  );
}
