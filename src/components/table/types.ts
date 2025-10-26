import type { ReactNode } from "react";

export type IHeader<T> = {
  title: string;
  key: keyof T;
  sortKey?: string;
  checkBox?: boolean;
  onCheck?: (isChecked: boolean) => void;
  checkbox?: boolean;
  cell?: (row: T) => ReactNode | string;
  thClass?: string;
  stopPropagation?: boolean;
};

export type ITable<T> = {
  header: IHeader<T>[];
  headerRowClass?: string;
  sortColumn?: (key: string) => void;
  downloadables?: string[];
  rows: T[];
  id?: string;
  totalPerPage?: number;
  onDeleteCheck?: (ids: string[]) => void;
  withCheckbox?: boolean;
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  onDownloadXlsx?: (row: T[]) => void;
};

export enum DOWNLOADABLE {
  XLSX = "xlsx",
  PDF = "pdf",
}
