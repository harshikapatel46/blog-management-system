import React from "react";

function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-8 py-3
        border-2 border-black
        rounded-full
        font-semibold
        bg-[#E8B5D2]
        text-black
        hover:bg-black
        hover:text-white
        transition-all
        duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;