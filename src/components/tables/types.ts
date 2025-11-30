import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  title: string;
  sortKey?: string;
  thClass?: string;
  cell?: (row: T) => ReactNode;
  stopPropagation?: boolean;
}

export interface ICollapsibleTable<T> {
  header: TableColumn<T>[];
  rows: T[];
  id: keyof T; // Unique key property name
  isLoading?: boolean;
  
  // Pagination
  totalPerPage?: number;
  
  // Selection
  withCheckbox?: boolean;
  onDeleteCheck?: (selectedIds: string[]) => void;
  
  // Interaction
  onRowClick?: (row: T) => void;
  renderSubComponent?: (row: T) => ReactNode; // For collapsible content
  
  // Sorting (Simplified for this demo)
  sortColumn?: (key: string) => void;
  
  // Toolbar props
  onDownloadXlsx?: (data: T[]) => void;
  onDownloadPdf?: (data: T[]) => void;
  onCreate?: () => void;
  downloadables?: string[];
  title?: string;
}

export interface TableColumn<T> {
  key: string;
  title: string;
  className?: string;
  sortKey?: string;
  cell?: (row: T) => React.ReactNode;
}

export interface CollapsibleTableProps<T> {
  id: keyof T | ((row: T) => string);
  header: TableColumn<T>[];
  rows: T[];
  onDeleteCheck?: (ids: string[]) => void;
  withCheckbox?: boolean;
  onRowClick?: (row: T) => void;
  renderSubComponent?: (row: T) => React.ReactNode;
  isLoading?: boolean;
  totalPerPage?: number;
  onDownloadXlsx?: (data: T[]) => void;
  onDownloadPdf?: (data: T[]) => void;
  
  // Search & Filter Props
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  
  departmentFilter?: string;
  onDepartmentFilterChange?: (val: string) => void;
  departments?: string[];

  levelFilter?: string;
  onLevelFilterChange?: (val: string) => void;
  levels?: string[];

  sessionFilter?: string;
  onSessionFilterChange?: (val: string) => void;
  sessions?: string[];
}