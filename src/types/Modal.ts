import { ReactChild } from "react";

export interface IModal {
  show: boolean;
  onClose: Function;
  children?: ReactChild;
}
