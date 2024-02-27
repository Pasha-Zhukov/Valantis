import React from "react";

import { Form } from "react-bootstrap";

function FormSelectFilter({
  onChangeTypeFields,
  fields,
}: {
  onChangeTypeFields: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  fields: string[];
}) {
  return (
    <>
      <Form.Select
        aria-label="Default select example"
        onChange={onChangeTypeFields}
        className="d-flex w-100  p-3 rounded-3 mt-3 fs-5"
      >
        <option value={-1}>Весь ассортимент</option>
        {fields?.map((item) => (
          <option key={item} value={item}>
            {item == "product"
              ? "Наименование товара"
              : item == "price"
              ? "Цена"
              : "Бренд"}
          </option>
        ))}
      </Form.Select>
    </>
  );
}

export default React.memo(FormSelectFilter);
