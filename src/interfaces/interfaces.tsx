export interface item {
  brand: null | string;
  id: number;
  price: number;
  product: string;
}
export type ProductsProps = {
  fields: string[];
  onChangeTypeFields: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  fieldsFilter: string[] | number[] | null;
  onChangeTypeFalter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  data: string[];
  handlePageClick: (offset: number) => void;
  isFilter: boolean;
  isFetchingGet_fieldsFilterSub: boolean;
  currentPage: { offset: number; limit: number };
};

export type FieldsState = {
  action: string;
};
export type FieldsStateCurrent = {
  event: string | null;
  offset?: number;
  limit?: number;
};
export type CurrentPage = {
  offset: number;
  limit: number;
};
export type FilterStateCurrent = {
  fieldsStateCurrent: string | null;
  event: string;
};
export type RequestParameters = {
  action: string;
  params: {
    offset: number;
    limit: number;
  };
};
