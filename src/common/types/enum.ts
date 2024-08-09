import { tuple } from "./tuple";

export const RoleEnum = tuple(
  "guest",
  "admin",
  "user",
  "super-admin",
  "member"
);
export type RoleType = (typeof RoleEnum)[number];
