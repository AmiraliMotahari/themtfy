export type PositionOptions =
  | "top-right"
  | "top-center"
  | "top-left"
  | "center-right"
  | "center-center"
  | "center-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";

export type IconOptions =
  | false
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info";

export type VariationOptions =
  | false
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info";

export type AutoCloseOptions = false | number;


export type ThemtfyOptions = {
  position: PositionOptions;
  title: string;
  body: string;
  icon: IconOptions;
  variation: VariationOptions;
  autoClose: false | number;
  onClose: Function;
  canClose: boolean;
  showProgress: boolean;
  backgroundColor: false | string;
  textColor: false | string;
  distanceX: false | string;
  distanceY: false | string;
};