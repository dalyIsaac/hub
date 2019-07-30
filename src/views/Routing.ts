export interface ViewRouteProps {
  viewId?: string;
}

export const viewBase = "/views";

export const gotoView = (viewId: string): string => {
  return `${viewBase}/${viewId}`;
};
