export type DataTransformer<T, R> = (data: T[]) => R[];

export type ValueFormatter = (value: number) => string;

export type ColorGenerator = (index: number, total: number) => string;

export interface DataAggregation {
  sum: number;
  average: number;
  min: number;
  max: number;
  count: number;
}
