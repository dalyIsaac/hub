import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  IColumn,
  DetailsList,
  SelectionMode,
  mergeStyleSets,
  IDetailsList,
  getTheme,
  Modal,
} from "office-ui-fabric-react";
import { Subject, GetItemsOptions, Item } from "../../model/Subject";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../Reducer";
import { APP_COMMAND_BAR_HEIGHT } from "../../../AppCommandBar/Common";
import { APPBAR_HEIGHT, VIEW_TITLE_HEIGHT } from "../../../Common";
import { SortItemsOptions, SortFieldKey } from "../../../Order";
import { gotoSubject } from "../../Routing";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { setFieldsArray } from "../../model/SetFieldsArray";
import { setFieldsDesc } from "../../model/SetFieldsDesc";
import { getDiffIndex } from "../View";
import SubjectComponent from "../Subject";
import ListViewContextMenu, {
  ListViewContextMenuProps,
} from "./ListViewContextMenu";
import { useSubjectView } from "../SubjectView";
import { Paths } from "../../../Routing";
import ListViewButtons from "./ListViewButtons";

const theme = getTheme();
const styles = mergeStyleSets({
  subjectWrapper: {
    backgroundColor: theme.palette.white,
    border: "1px solid " + theme.palette.neutralTertiary,
    borderRadius: 4,
  },
});

interface ListViewProps {
  options?: GetItemsOptions;
  sortOptions?: SortItemsOptions;
  showCloseButton?: boolean;
}

function ListView({
  match,
  history,
  options,
  sortOptions,
  showCloseButton,
}: ListViewProps & RouteComponentProps): JSX.Element {
  const parentId = options ? options.parentId : undefined;
  const { subjects } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const {
    items,
    componentOrder,
    currentOrder,
    setCurrentOrder,
    reorderParams,
    sortFields,
  } = useSubjectView({ options, sortOptions });

  const dispatchSetFieldsDesc = useCallback(
    (e?: any, column?: IColumn): void => {
      if (column!.key !== "openButton") {
        dispatch(
          setFieldsDesc(
            column!.key,
            !column!.isSortedDescending,
            reorderParams,
          ),
        );
      }
    },
    [dispatch, reorderParams],
  );

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

  // Update modalItem
  useEffect((): void => {
    if (modalItem) {
      if (modalItem.id in subjects.dict) {
        const subject = subjects.dict[modalItem.id];
        if (subject !== modalItem.subject) {
          setModalItem({ ...modalItem, subject });
        }
      } else {
        setModalItem(null);
      }
    }
  }, [subjects.dict, modalItem]);

  //#region Render
  const renderSubjectString = useCallback(
    (item: Item, _index?: number, column?: IColumn): string =>
      item.subject[column!.key as keyof Subject] as string,
    [],
  );

  const renderChildren = useCallback(
    (item: Item): string => item.subject.children.order.length.toLocaleString(),
    [],
  );

  const renderDate = useCallback(
    (item: Item, _index?: number, column?: IColumn): string => {
      const date = item.subject[column!.key as keyof Subject] as Date;
      return date ? date.toLocaleString() : "";
    },
    [],
  );

  const renderButtons = useCallback(
    (item: Item): JSX.Element => (
      <ListViewButtons
        item={item}
        openModal={openModal}
        showCloseButton={showCloseButton}
      />
    ),
    [openModal],
  );
  //#endregion

  const onItemInvoked = useCallback(
    (item: Item): void => {
      history.push(gotoSubject("list", item.id));
    },
    [history],
  );

  const columnsDict: Partial<{ [key in SortFieldKey]: IColumn }> = {
    children: {
      isResizable: true,
      key: "children",
      minWidth: 100,
      name: "# Children",
      onRender: renderChildren,
    },
    completed: {
      isResizable: true,
      key: "completed",
      minWidth: 150,
      name: "Completed",
      onRender: renderDate,
    },
    created: {
      isResizable: true,
      key: "created",
      minWidth: 150,
      name: "Date created",
      onRender: renderDate,
    },
    description: {
      isResizable: true,
      key: "description",
      minWidth: 100,
      name: "Description",
      onRender: renderSubjectString,
    },
    dueDate: {
      isResizable: true,
      key: "dueDate",
      minWidth: 150,
      name: "Due date",
      onRender: renderDate,
    },
    name: {
      isResizable: true,
      key: "name",
      minWidth: 100,
      name: "Name",
      onRender: renderSubjectString,
    },
  };

  const reorder = useCallback(
    (draggedIndex: number, targetIndex: number): void => {
      const dragged = sortFields[draggedIndex];
      const fields = sortFields.filter((_, index) => index !== draggedIndex);
      fields.splice(targetIndex, 0, dragged);
      dispatch(setFieldsArray(fields, reorderParams));
    },
    [sortFields, dispatch, reorderParams],
  );

  const columns: IColumn[] = [];
  for (const field of sortFields) {
    const current = columnsDict[field.key];
    if (current) {
      current.isSorted = true;
      current.isSortedDescending = field.desc;
      columns.push(current);
    }
  }

  columns.push({
    key: "itemButtons",
    minWidth: 80,
    name: "",
    onRender: renderButtons,
  });

  const listRef: React.MutableRefObject<IDetailsList | null> = useRef(null);

  // Scrolls to newly added subjects
  useEffect((): void => {
    if (
      listRef.current &&
      currentOrder !== componentOrder &&
      componentOrder.length > 0
    ) {
      // Gets the index to scroll to
      const index = getDiffIndex(currentOrder, componentOrder);

      // Scroll to the index if either:
      // - the new index doesn't have a parent
      // - the new index has a parent, which matches match.param.id
      const s = subjects.dict[componentOrder[index]];
      if (s.parents.size === 0 || s.parents.has(parentId!)) {
        listRef.current.focusIndex(index);
      }

      setCurrentOrder(componentOrder);
    }
  }, [componentOrder, parentId, currentOrder, subjects, setCurrentOrder]);

  const getKey = useCallback((item: Item): string => item.id, []);

  const [
    contextMenuProps,
    updateContextMenuProps,
  ] = useState<ListViewContextMenuProps | null>(null);
  const dismissContextMenu = useCallback((): void => {
    updateContextMenuProps(null);
  }, []);
  const onItemContextMenu = useCallback(
    (item?: Item, index?: number, ev?: Event): boolean => {
      if (item && ev) {
        updateContextMenuProps({
          ev,
          item,
          onDismiss: dismissContextMenu,
          onEditClick: setModalItem,
        });

        // stops ev.preventDefault()
        return false;
      } else {
        // runs ev.preventDefault()
        return true;
      }
    },
    [dismissContextMenu],
  );

  const height = `calc(100vh - ${APPBAR_HEIGHT +
    APP_COMMAND_BAR_HEIGHT +
    (match.path === Paths.view ? VIEW_TITLE_HEIGHT : 0)}px)`;
  return (
    <React.Fragment>
      <DetailsList
        styles={{ root: { height } }}
        getKey={getKey}
        componentRef={listRef}
        onColumnHeaderClick={dispatchSetFieldsDesc}
        columns={columns}
        items={items}
        isHeaderVisible={true}
        selectionMode={SelectionMode.none}
        onItemInvoked={onItemInvoked}
        onItemContextMenu={onItemContextMenu}
        columnReorderOptions={{
          frozenColumnCountFromEnd: 1,
          frozenColumnCountFromStart: 0,
          handleColumnReorder: reorder,
        }}
      />
      {contextMenuProps && <ListViewContextMenu {...contextMenuProps} />}
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
    </React.Fragment>
  );
}

export default withRouter(ListView);
