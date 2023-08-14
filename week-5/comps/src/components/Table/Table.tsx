/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Header from "./Header";
import Body from "./Body";
import type { Data } from "../../App";

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Data[];
}

function Table({ data, ...rest }: TableProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading

  const keys = Object.keys(data[0]);

  return (
    <div {...rest} className="w-1/2 rounded-xl border-2 border-black">
      <Header titles={keys} />
      <Body data={data} />
    </div>
  );
}

export default Table;
