import { match } from "react-router";

export type RouteIdMatch = match<{ id?: string }>;

export interface RouteIdProps {
  match: RouteIdMatch;
}
