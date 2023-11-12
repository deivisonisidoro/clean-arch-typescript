import { SnackbarMessageType } from "../../../utils/enums/snackbarMessages";

export interface SnackbarProps {
  message: string;
  type: SnackbarMessageType;
}