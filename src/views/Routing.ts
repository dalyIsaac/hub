export interface ViewRouteProps {
  name?: string;
}

export const viewBase = "/views";

export const gotoView = (name: string): string => {
  return `${viewBase}/${name}`;
};
