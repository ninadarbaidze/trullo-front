export type Props = {
  name: string;
  hiddenDropBox?: boolean;
  setCustomImage?: (file: string) => void;
  uploadBtnStyle?: string;
  uploadBtnText?: string;
  imageReseted?: boolean;
  disabled?: boolean;
  boxClassName?: string;
};
