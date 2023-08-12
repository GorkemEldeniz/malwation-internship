// then define an Icon component that references the
export type IconTypes = "icon-1" | "icon-2" | "icon-3";
interface IIcon extends React.ComponentPropsWithoutRef<"svg"> {
  icon: IconTypes;
}

function Icon({ icon, ...props }: IIcon) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg {...props}>
      <use href={`assets/sprite.svg#${icon}`} />
    </svg>
  );
}

export default Icon;
