import { Table } from "react-bootstrap";
import { item } from "../../interfaces/interfaces";

function TableProducts({ uniqueProducts }: { uniqueProducts: item[] }) {
  return (
    <>
      <Table striped bordered hover className="mt-3 w-100 ">
        <thead>
          {uniqueProducts && (
            <tr>
              <th>Бренд</th>
              <th>ID</th>
              <th>Цена</th>
              <th>Наименование</th>
            </tr>
          )}
        </thead>
        <tbody>
          {uniqueProducts?.map((item: item) => {
            return (
              <tr key={item?.id}>
                <td>{item?.brand}</td>
                <td>{item?.id}</td>
                <td>{item?.price}</td>
                <td>{item?.product}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TableProducts;
