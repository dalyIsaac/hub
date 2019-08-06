import React from "react";
import { DetailsList, SelectionMode } from "office-ui-fabric-react";
import { GetItemsOptions } from "../../model/Subject";
import { useSelector } from "react-redux";
import { State } from "../../../Reducer";
import { APP_COMMAND_BAR_HEIGHT } from "../../../AppCommandBar/Common";
import { APPBAR_HEIGHT, VIEW_TITLE_HEIGHT } from "../../../Common";
import { SortItemsOptions } from "../../../Order";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ListViewContextMenu from "./ListViewContextMenu";
import { useSubjectView } from "../SubjectView";
import { Paths } from "../../../Routing";
import ListViewModal from "./ListViewModal";
import { useListViewModal } from "./UseListViewModal";
import { useListViewContextMenu } from "./UseListViewContextMenu";
import { useListViewRender } from "./UseListViewRender";
import { useListViewScroll } from "./UseListViewScroll";
import { useListViewDetailsList } from "./UseListViewDetailsList";

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

  const {
    items,
    componentOrder,
    currentOrder,
    setCurrentOrder,
    reorderParams,
    sortFields,
  } = useSubjectView({ options, sortOptions });

  const {
    dispatchSetFieldsDesc,
    getKey,
    onItemInvoked,
    reorder,
  } = useListViewDetailsList({
    history,
    reorderParams,
    sortFields,
  });

  const { dismissModal, modalItem, openModal, setModalItem } = useListViewModal(
    subjects,
  );
  const { contextMenuProps, onItemContextMenu } = useListViewContextMenu(
    setModalItem,
    showCloseButton,
  );

  const columns = useListViewRender({
    openModal,
    showCloseButton,
    sortFields,
  });

  const listRef = useListViewScroll({
    componentOrder,
    currentOrder,
    parentId,
    setCurrentOrder,
    subjects,
  });

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
      <ListViewModal
        modalItem={modalItem}
        dismissModal={dismissModal}
        showCloseButton={showCloseButton}
      />
    </React.Fragment>
  );
}

export default withRouter(ListView);
