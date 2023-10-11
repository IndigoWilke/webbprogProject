export interface FilterOption {
  label: string;
  checked: boolean;
}

export interface FilterCategory {
  name: string;
  options?: FilterOption[]; // Make options property optional
}