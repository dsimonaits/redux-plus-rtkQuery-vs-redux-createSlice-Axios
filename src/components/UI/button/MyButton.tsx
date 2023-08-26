import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import cl from "./MyButton.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  additionalClassName?: string;
}

const MyButton: FC<ButtonProps> = ({
  children,
  additionalClassName,
  ...props
}) => {
  const combinedClasses = `${cl.myBtn} ${additionalClassName}`;

  return (
    <button {...props} className={combinedClasses}>
      {children}
    </button>
  );
};

export default MyButton;
