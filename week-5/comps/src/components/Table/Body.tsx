import type { TableProps } from "./Table";
import cn from "../../utils/cn";

function Body({ data, ...rest }: TableProps) {
  return (
    <>
      {data.map((item, id) => (
        <div className="flex" key={id} {...rest}>
          {Object.values(item).map((value) => (
            <span
              className={cn(
                "flex flex-1 items-center justify-center border-2 border-s-0 border-t-0 border-black last:border-e-0",
                {
                  "border-b-0": id === data.length - 1,
                }
              )}
            >
              {typeof value === "boolean" ? value.toString() : value}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}

export default Body;
