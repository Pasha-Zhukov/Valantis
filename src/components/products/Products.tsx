import React from "react";

import { useGet_itemsQuery } from "../../apiService";
import { ProductsProps, item } from "../../interfaces/interfaces";
import { Loader } from "../loader/Loader";

import Pagination from "react-bootstrap/Pagination";
import FormSelectFilter from "../formSelectFilter/FormSelectFilter";
import FormSelectSubFilter from "../formSelectSubFilter/formSelectSubFilter";
import TableProducts from "../tableProducts/TableProducts";

function Products({
  fields,
  onChangeTypeFields,
  fieldsFilter,
  onChangeTypeFalter,
  data,
  handlePageClick,
  isFilter,
  isFetchingGet_fieldsFilterSub,
  currentPage,
}: ProductsProps) {
  const {
    data: arrProd,
    error,
    isFetching,
    refetch,
  } = useGet_itemsQuery(data, {
    skip: !data,
  });

  if (error) {
    console.log(error);
    refetch();
  }

  const uniqueProducts = arrProd?.result?.filter(
    (value: item, index: number, self: item[]) =>
      self.findIndex((p) => p.id === value.id) === index
  );

  const fieldsFilterCurrent = [...new Set(fieldsFilter as Iterable<string>)];

  return (
    <div className="container">
      <FormSelectFilter
        onChangeTypeFields={onChangeTypeFields}
        fields={fields}
      />
      {isFetchingGet_fieldsFilterSub && <Loader />}
      {fieldsFilter && isFilter && (
        <FormSelectSubFilter
          isFetching={isFetching}
          onChangeTypeFalter={onChangeTypeFalter}
          fieldsFilterCurrent={fieldsFilterCurrent}
        />
      )}

      {isFetching ? (
        <Loader />
      ) : (
        <>
          <TableProducts uniqueProducts={uniqueProducts} />
          {!isFilter && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage.offset === 0}
                  onClick={() => handlePageClick(-50)}
                />
                <Pagination.Next onClick={() => handlePageClick(50)} />
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default React.memo(Products);
