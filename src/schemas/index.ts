import type { IconType } from 'react-icons/lib';

export interface Category {
  id: string;
  title: string;
  icon: string;
  background_color_light: string;
  background_color_dark: string;
  created_at: string;
  updated_at: string;
  transactionsCount?: number;
  transactionsTotalValue?: number;
}

export interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: Category;
  category_id: string;
  created_at: Date;
  transaction_date: Date;
  description: string;
}

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface Sort {
  sort: string;
  direction: string;
}

export interface PaginationChange {
  selected: number;
}
export interface LineGraphData {
  labels: string[];
  datasets: LineDataset[];
}
export interface DonutGraphData {
  labels: string[];
  datasets: DonutDataset[];
}

export interface LineDataset {
  label: string;
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
  borderJoinStyle: string;
  data: number[];
}

export interface DonutDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
}

export type RowsByPageOption = { value: number; label: number };

type IconComponentType = React.ComponentType<IconType>;
export type IconMap = { [key: string]: IconComponentType };

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
