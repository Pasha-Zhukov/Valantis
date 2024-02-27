import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  useGet_fieldsFilterQuery,
  useGet_fieldsQuery,
  useGet_fieldsSubFilterQuery,
  useGet_idsQuery,
} from "../apiService";
import {
  CurrentPage,
  FieldsState,
  FieldsStateCurrent,
  FilterStateCurrent,
  RequestParameters,
} from "../interfaces/interfaces";

import Products from "../components/products/Products";

function MainPage() {
  const [fieldsState, setFieldsState] = useState<FieldsState>({
    action: "get_fields",
  });
  const [fieldsStateCurrent, setFieldsStateCurrent] =
    useState<FieldsStateCurrent>({
      event: null,
    });

  const [currentPage, setCurrentPage] = useState<CurrentPage>({
    offset: 0,
    limit: 50,
  });

  const [filterStateCurrent, setFilterStateCurrent] =
    useState<FilterStateCurrent>({
      fieldsStateCurrent: null,
      event: "",
    });
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const [requestParameters, setRequestParameters] = useState<RequestParameters>(
    {
      action: "get_ids",
      params: { offset: 0, limit: 50 },
    }
  );

  const onChangeTypeFields = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value !== "-1") {
        setFieldsStateCurrent({
          event: event.target.value,
          offset: currentPage.offset,
          limit: currentPage.limit,
        });
        setIsFilter(true);
      } else setIsFilter(false);
    },
    [fieldsState, fieldsStateCurrent]
  );

  const onChangeTypeFalter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setFilterStateCurrent({
        fieldsStateCurrent: fieldsStateCurrent?.event,
        event: event.target.value,
      });
    },
    [fieldsState, filterStateCurrent]
  );

  const handlePageClick = useCallback(
    (increment: number) => {
      setCurrentPage((prevPage) => ({
        ...prevPage,
        offset: prevPage.offset + increment,
      }));
    },
    [currentPage]
  );

  const {
    data,
    error: isErrorGet_ids,
    refetch: refetchGet_ids,
  } = useGet_idsQuery(requestParameters);

  const {
    data: fields,
    error: isErrorGet_fields,
    refetch: refetchGet_fields,
  } = useGet_fieldsQuery(fieldsState);

  const {
    data: fieldsFilter,
    isFetching: isFetchingGet_fieldsFilterSub,
    error: isErrorGet_fieldsFilterSub,
    refetch: refetchGet_fieldsFilterSub,
  } = useGet_fieldsFilterQuery(fieldsStateCurrent, {
    skip: !fieldsStateCurrent.event,
  });

  const {
    data: fieldsFilterCurrent,
    error: isErrorGet_fieldsSubFilter,
    refetch: refetchGet_fieldsSubFilterFilter,
  } = useGet_fieldsSubFilterQuery(filterStateCurrent, {
    skip: !filterStateCurrent.fieldsStateCurrent,
  });

  if (isErrorGet_ids && "error" in isErrorGet_ids) {
    console.log(isErrorGet_ids.error);
    refetchGet_ids();
  }

  if (isErrorGet_fields && "error" in isErrorGet_fields) {
    console.log(isErrorGet_fields.error);
    refetchGet_fields();
  }

  if (isErrorGet_fieldsFilterSub && "error" in isErrorGet_fieldsFilterSub) {
    console.log(isErrorGet_fieldsFilterSub.error);
    refetchGet_fieldsFilterSub();
  }

  if (isErrorGet_fieldsSubFilter && "error" in isErrorGet_fieldsSubFilter) {
    console.log(isErrorGet_fieldsSubFilter.error);
    refetchGet_fieldsSubFilterFilter();
  }

  useEffect(() => {
    setRequestParameters({
      action: "get_ids",
      params: currentPage,
    });
    setFieldsState({
      action: "get_fields",
    });
  }, [currentPage, fieldsStateCurrent]);

  return (
    <Products
      currentPage={currentPage}
      isFetchingGet_fieldsFilterSub={isFetchingGet_fieldsFilterSub}
      isFilter={isFilter}
      data={isFilter ? fieldsFilterCurrent?.result : data?.result}
      fields={fields?.result}
      fieldsFilter={fieldsFilter?.result}
      handlePageClick={handlePageClick}
      onChangeTypeFields={onChangeTypeFields}
      onChangeTypeFalter={onChangeTypeFalter}
    />
  );
}

export default MainPage;
