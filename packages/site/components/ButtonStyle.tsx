import React from "react";

const ButtonStyle = React.forwardRef(
  (
    {
      children,
      href,
    }: {
      children: React.ReactElement;
      href?: string;
      onClick?: () => void;
    },
    ref
  ) => {
    return (
      <>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            className:
              "px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none " +
              child.props.className,
            href,
            ref,
          });
        })}
      </>
    );
  }
);

export default ButtonStyle;
