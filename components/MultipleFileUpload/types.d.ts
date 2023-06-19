export type Props = {
  name: string;
  setCustomImage?: (file: string) => void;
  uploadBtnStyle?: string;
  disabled?: boolean;
  boxClassName?: string;
  fileRef: RefObject<HTMLInputElement>;
  submitImages?: (files: File[]) => void;
};
