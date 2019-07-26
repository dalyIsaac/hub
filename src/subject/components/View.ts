export const getDiffIndex = (
  oldOrder: string[],
  newOrder: string[],
): number => {
  for (let i = 0; i < newOrder.length; i++) {
    const newEl = newOrder[i];
    const oldEl = oldOrder[i];

    if (newEl !== oldEl) {
      return i;
    }
  }
  return 0;
};
