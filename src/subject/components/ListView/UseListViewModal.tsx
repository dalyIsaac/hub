import React, { useState, useCallback } from "react";
import { Item, SubjectState } from "../../model/Subject";

export interface UseListViewModal {
  modalItem: Item | null;
  setModalItem: React.Dispatch<React.SetStateAction<Item | null>>;
  openModal: (item: Item) => void;
  dismissModal: () => void;
}

export function useListViewModal(subjects: SubjectState): UseListViewModal {
  // The Subject shown in the modal
  const [modalItem, setModalItem] = useState<Item | null>(null);

  const dismissModal = useCallback((): void => {
    setModalItem(null);
  }, []);

  const openModal = useCallback((item: Item): void => {
    setModalItem(item);
  }, []);

  if (modalItem && !(modalItem.id in subjects.dict)) {
    setModalItem(null);
  }

  return { dismissModal, modalItem, openModal, setModalItem };
}
