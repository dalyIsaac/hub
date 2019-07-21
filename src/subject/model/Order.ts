import { Subject, SubjectDictState } from "./Subject";
import { isUndefined } from "lodash";

export interface SortField {
  key: keyof Omit<Subject, "parents">;
  name: string;
  desc: boolean;
  compareLength?: boolean;
}

export interface SortItemsOptions {
  fields: SortField[];
  separateCompletedItems: boolean;
}

export interface OrderState {
  order: string[];
  options: SortItemsOptions;
}

export function comparator(
  fields: SortField[],
  subjects: SubjectDictState,
): (a: string, b: string) => number {
  function compare(
    a: any,
    b: any,
    desc: boolean,
    compareLength?: boolean,
  ): number {
    if (compareLength) {
      if (
        (Array.isArray(a) && Array.isArray(b)) ||
        (typeof a === "string" && typeof b === "string")
      ) {
        a = a.length;
        b = b.length;
      } else if (a instanceof Set && b instanceof Set) {
        a = a.size;
        b = b.size;
      }
    }

    const aDefined = !isUndefined(a);
    const bDefined = !isUndefined(b);
    const coeff = desc ? -1 : 1;
    if (!aDefined && !bDefined) {
      return 0;
    } else if (aDefined && !bDefined) {
      return coeff * 1;
    } else if (!aDefined && bDefined) {
      return coeff * -1;
    } else if (a < b) {
      return coeff * -1;
    } else if (a > b) {
      return coeff * 1;
    }
    return 0;
  }

  return function compareOrder(a: string, b: string): number {
    for (const { key, desc, compareLength } of fields) {
      let _a: any = subjects[a][key];
      let _b: any = subjects[b][key];
      if (key === "children") {
        _a = (_a as OrderState)["order"];
        _b = (_b as OrderState)["order"];
      }
      const result = compare(_a, _b, desc, compareLength);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
}

export function sortItems(
  subjects: SubjectDictState,
  { order, options: { fields, separateCompletedItems } }: OrderState,
): string[] {
  const items = [];
  const completedItems = [];

  for (const id of order) {
    const subject = subjects[id];
    if (subject.completed && separateCompletedItems) {
      completedItems.push(id);
    } else {
      items.push(id);
    }
  }

  const compare = comparator(fields, subjects);
  items.sort(compare);
  completedItems.sort(compare);

  return items.concat(completedItems);
}

export const getInitialOrder = (): OrderState => ({
  order: [],
  options: {
    fields: [
      {
        key: "created",
        name: "Date created",
        desc: false,
      },
      {
        key: "completed",
        name: "Date completed",
        desc: false,
      },
      {
        key: "children",
        name: "Number of children",
        desc: false,
        compareLength: true,
      },
      {
        key: "description",
        name: "Description size",
        desc: false,
        compareLength: true,
      },
      {
        key: "dueDate",
        name: "Due date",
        desc: false,
      },
      {
        key: "name",
        name: "Name",
        desc: false,
      },
    ],
    separateCompletedItems: true,
  },
});
