import { Subject, SubjectDictState } from "./Subject";
import { isUndefined } from "lodash";

export interface SortField {
  key: keyof Omit<Subject, "parents">;
  desc: boolean;
}

export interface SortItemsOptions {
  fields: SortField[];
  separateCompletedItems: boolean;
}

export interface OrderState {
  order: string[];
  options: SortItemsOptions;
}

export function comparator(fields: SortField[], subjects: SubjectDictState) {
  function compare(a: any, b: any, desc: boolean): number {
    const aDefined = !isUndefined(a);
    const bDefined = !isUndefined(b);
    const coeff = desc ? -1 : 1;
    if (!aDefined && !bDefined) {
      return 0;
    } else if (aDefined && bDefined) {
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

  return function(a: string, b: string): number {
    for (const { key, desc } of fields) {
      const result = compare(subjects[a][key], subjects[b][key], desc);
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
