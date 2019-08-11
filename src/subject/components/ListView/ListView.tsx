import { APPBAR_HEIGHT, VIEW_TITLE_HEIGHT } from "../../../Common";
import { AllRouteComponentProps, Paths } from "../../../Routing";
import { DetailsList, SelectionMode } from "office-ui-fabric-react";

import { APP_COMMAND_BAR_HEIGHT } from "../../../components/AppCommandBar/Common";
import AppCommandBar from "../../../components/AppCommandBar";
import { GetItemsOptions } from "../../../model/Subject";
import ListViewContextMenu from "./ListViewContextMenu";
import ListViewModal from "./ListViewModal";
import React from "react";
import { SortItemsOptions } from "../../../model/Order";
import { State } from "../../../Reducer";
import Wrapper from "../../../components/Wrapper";
import { useCommandBar } from "../../../components/UseCommandBar";
import { useListViewContextMenu } from "./UseListViewContextMenu";
import { useListViewDetailsList } from "./UseListViewDetailsList";
import { useListViewModal } from "./UseListViewModal";
import { useListViewRender } from "./UseListViewRender";
import { useListViewScroll } from "./UseListViewScroll";
import { useSelector } from "react-redux";
import { useSubjectView } from "../../../components/SubjectView";
import { withRouter } from "react-router-dom";

interface ListViewProps {
  title?: JSX.Element;
  options?: GetItemsOptions;
  showCloseButton?: boolean;
  sortOptions?: SortItemsOptions;
}

function ListView({
  title,
  history,
  match,
  options,
  showCloseButton,
  sortOptions,
}: ListViewProps & AllRouteComponentProps): JSX.Element {
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

  const commandBarItems = useCommandBar({ match, subjectId: parentId });

  return (
    <Wrapper
      commandBar={<AppCommandBar items={commandBarItems} />}
      main={
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
      }
      parentId={parentId}
      title={title}
    />
  );
}

export default withRouter(ListView);
