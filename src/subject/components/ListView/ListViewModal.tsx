import React from "react";
import { Item } from "../../../model/Subject";
import { Modal, getTheme, mergeStyleSets } from "office-ui-fabric-react";
import SubjectComponent from "../Subject";

const theme = getTheme();
const styles = mergeStyleSets({
  subjectWrapper: {
    backgroundColor: theme.palette.white,
    border: "1px solid " + theme.palette.neutralTertiary,
    borderRadius: 4,
  },
});

interface ListViewModalProps {
  modalItem: Item | null;
  dismissModal: () => void;
  showCloseButton?: boolean;
}

export default function ListViewModal({
  modalItem,
  dismissModal,
  showCloseButton,
}: ListViewModalProps): JSX.Element {
  return (
    <Modal
      isOpen={!!modalItem}
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
        {modalItem ? (
          <SubjectComponent
            showCloseButton={showCloseButton}
            item={modalItem}
            showOpenButton={true}
          />
        ) : null}
      </div>
    </Modal>
  );
}
