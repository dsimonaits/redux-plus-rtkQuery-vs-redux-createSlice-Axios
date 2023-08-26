import React, { FC, ReactNode } from "react";
import cl from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  styles?: string;
}

const Container: FC<ContainerProps> = ({ children, styles }) => {
  return <div className={`${cl.container} ${styles}`}>{children}</div>;
};

export default Container;
