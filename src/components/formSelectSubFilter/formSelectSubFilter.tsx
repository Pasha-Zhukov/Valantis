import React from "react";

import { Form } from "react-bootstrap";

function formSelectSubFilter({
  onChangeTypeFalter,
  fieldsFilterCurrent,
  isFetching,
}: {
  onChangeTypeFalter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  fieldsFilterCurrent: any;
  isFetching: boolean;
}) {
  return (
    <>
      <Form.Select
        disabled={isFetching}
        aria-label="Default select example"
        onChange={onChangeTypeFalter}
        className="d-flex w-100  p-3 rounded-3 mt-3 fs-5 w-100 "
      >
        <option value={-1}>Выберите тип поля</option>
        {fieldsFilterCurrent
          ?.toSorted()
          .sort((a: any, b: any) => a - b)
          .map((item: any) => {
            {
              return (
                item && (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              );
            }
          })}
      </Form.Select>
    </>
  );
}

export default React.memo(formSelectSubFilter);
