export interface IPerson {
  id: string;
  name: string;
  role: Role;
}

export type Role = "leader" | "group1" | "group2" | "none";

export interface IOption {
  label: string;
  value: string;
}

export interface IEditState {
  id: string;
  newRole: Role;
}
