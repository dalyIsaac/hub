import React, { useCallback } from "react";
import {
  IColumn,
  DetailsList,
  SelectionMode,
  mergeStyleSets,
  getTheme,
  IconButton,
} from "office-ui-fabric-react";
import { Subject, GetItemsOptions, getItems, Item } from "../model/Subject";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { APP_COMMAND_BAR_HEIGHT } from "../../AppCommandBar/Common";
import { APPBAR_HEIGHT } from "../../Common";
import { SortItemsOptions, sortItems } from "../model/Order";
import { gotoSubject } from "../../Routing";
import { Link } from "react-router-dom";

const theme = getTheme();
const styles = mergeStyleSets({
  detailsList: {
    height: `calc(100vh - ${APPBAR_HEIGHT}px - ${APP_COMMAND_BAR_HEIGHT}px)`,
  },
  openButton: {
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
});

interface ListViewProps {
  options?: GetItemsOptions;
  sortOptions?: SortItemsOptions;
}

export default function ListView({
  options,
  sortOptions,
}: ListViewProps): JSX.Element {
  const renderSubjectString = useCallback(
    (item: Item, _index?: number, column?: IColumn): string =>
      item.subject[column!.key as keyof Subject] as string,
    [],
  );

  const renderDate = useCallback(
    (item: Item, _index?: number, column?: IColumn): string => {
      const date = item.subject[column!.key as keyof Subject] as Date;
      return date ? date.toLocaleString() : "";
    },
    [],
  );

  const { subjects } = useSelector((state: State) => state);

  const componentOrder = sortOptions
    ? sortItems(subjects.dict, { ...subjects.order, options: sortOptions })
    : subjects.order.order;
  const items = getItems(subjects.dict, componentOrder, options);

  const renderOpenButton = useCallback((item: Item): JSX.Element => {
    const openLabel = "Open " + item.subject.name;
    return (
      <Link to={gotoSubject("list", item.id)}>
        <IconButton
          primary
          styles={{ root: { width: "" } }}
          className={styles.openButton}
          iconProps={{ iconName: "OpenFile" }}
          title={openLabel}
          ariaLabel={openLabel}
        />
      </Link>
    );
  }, []);

  const columns: IColumn[] = [
    {
      key: "name",
      minWidth: 150,
      name: "Name",
      onRender: renderSubjectString,
    },
    {
      key: "description",
      minWidth: 150,
      name: "Description",
      onRender: renderSubjectString,
    },
    {
      key: "created",
      minWidth: 150,
      name: "Created",
      onRender: renderDate,
    },
    {
      key: "dueDate",
      minWidth: 150,
      name: "Due date",
      onRender: renderDate,
    },
    {
      key: "completed",
      minWidth: 150,
      name: "Completed",
      onRender: renderDate,
    },
    {
      key: "openButton",
      minWidth: 24,
      name: "",
      onRender: renderOpenButton,
    },
  ];

  return (
    <DetailsList
      className={styles.detailsList}
      columns={columns}
      items={items}
      isHeaderVisible={true}
      selectionMode={SelectionMode.none}
    />
  );
}
