// then define an Icon component that references the
import type { SVGAttributes } from "react";

interface IconProp extends SVGAttributes<SVGElement> {
  id: "icon-1" | "icon-2" | "icon-3";
}

function Icon({ id, ...props }: IconProp) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg {...props}>
      <use href={`assets/sprite.svg#${id}`} />
    </svg>
  );
}

export default Icon;
