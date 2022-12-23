import { XCircle } from "phosphor-react";
import React from "react";

const ItemRow = () => {
  return (
    <tr className="border-invoice" style={{ height: "45px" }}>
      <td className="ps-4 py-3">
        <input className="invoiceCreateBigInputs" type="text" />
      </td>
      <td className="text-center   py-3">
        <input className="invoiceCreateSmallInputs" placeholder="00.00" type="text" />
      </td>
      <td className="text-center   py-3">
        <input className="invoiceCreateSmallInputs" placeholder="00.00" type="text" />
      </td>
      <td className="text-center   py-3">
        <input className="invoiceCreateSmallInputs" placeholder="00.00" type="text" />
      </td>
      <td className="text-center py-3 ">
        <input className="invoiceCreateSmallInputs" placeholder="00.00" type="text" />
      </td>{" "}
      <td className="text-center py-3 ">
        <XCircle size={22} color="#ff3e3e" weight="fill" />{" "}
      </td>
    </tr>
  );
};

export default ItemRow;
