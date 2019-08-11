import { GetItemsOptions, Item, getItems } from "../model/Subject";
import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import {
  SetSortParameters,
  SortField,
  SortItemsOptions,
  sortItems,
} from "../model/Order";

import GridView from "./GridView";
import ListView from "../subject/components/ListView/ListView";
import { State } from "../Reducer";
import { SubjectsRouteProps } from "../model/Subject/Routing";
import { getDisplay } from "../Display";
import { isUndefined } from "lodash";
import { useSelector } from "react-redux";

export interface SubjectViewHookProps {
  options?: GetItemsOptions;
  sortOptions?: SortItemsOptions;
  order?: string[];
}

export interface UseSubjectView {
  /**
   * Array of the items to render.
   */
  items: Item[];

  /**
   * Array of the `id`s of the items to render.
   */
  componentOrder: string[];

  /**
   * Array of the `id`s of the items to render, stored in React state. This
   * should be used for scrolling to newly added subjects.
   */
  currentOrder: string[];

  /**
   * Sets `currentOrder` in React state.
   */
  setCurrentOrder: React.Dispatch<React.SetStateAction<string[]>>;

  /**
   * Array of the sort fields.
   */
  sortFields: SortField[];

  /**
   * Arguments to be passed to reducers for reordering items.
   */
  reorderParams: SetSortParameters;
}

export function useSubjectView({
  options,
  sortOptions,
}: SubjectViewHookProps): UseSubjectView {
  let parentId;
  let viewId;
  if (options) {
    ({ parentId, viewId } = options);
  }
  const { subjects, views } = useSelector((state: State) => state);

  let componentOrder: string[];
  let sortFields: SortField[];
  let reorderParams: SetSortParameters;

  if (sortOptions) {
    componentOrder = sortItems(subjects.dict, {
      ...subjects.order,
      options: sortOptions,
    });
    sortFields = sortOptions.fields;
    reorderParams = { setSearchOptions: true };
  } else if (parentId) {
    componentOrder = subjects.dict[parentId].children.order;
    sortFields = subjects.dict[parentId].children.options.fields;
    reorderParams = { subjectId: parentId };
  } else if (viewId) {
    componentOrder = views.dict[viewId].children.order;
    sortFields = views.dict[viewId].children.options.fields;
    reorderParams = {};
  } else {
    componentOrder = subjects.order.order;
    sortFields = subjects.order.options.fields;
    reorderParams = {};
  }
  const [currentOrder, setOrder] = useState(componentOrder);
  const items = getItems(subjects.dict, componentOrder, options);

  return {
    componentOrder,
    currentOrder,
    items,
    reorderParams,
    setCurrentOrder: setOrder,
    sortFields,
  };
}

export default function SubjectView({
  match,
  location,
}: RouteComponentProps<SubjectsRouteProps>): JSX.Element {
  const { parentId } = match.params;
  const display = getDisplay(location);

  const { dict } = useSelector((state: State) => state.subjects);

  if (!isUndefined(parentId) && !(parentId in dict)) {
    return <Redirect to="/" />;
  }

  const options = { parentId };
  // if (isUndefined(parentId)) {
  if (display === "list") {
    return <ListView options={options} />;
  } else {
    return <GridView options={options} />;
  }
}
