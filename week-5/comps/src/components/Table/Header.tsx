import React from "react";
import type { Data } from "../../App";

interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  titles: keyof Data[];
}

function Header({ titles, ...rest }: TableHeaderProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <div {...rest} className="flex">
      {titles.map((title, id) => (
        <span
          className="flex flex-1 items-center justify-center border-2 border-s-0 border-t-0 border-black last:border-e-0 "
          key={id}
        >
          {title}
        </span>
      ))}
    </div>
  );
}

export default Header;
