import {ReactElement} from 'react';

export interface ConfirmModalProps {
  open: boolean;
  onClose: (action?: any) => void;
  handleConfirm: (action?: any) => void;
  customContent?: string | ReactElement;
  message?: string;
  question?: string;
  confirmText?: string;
  cancelText?: string;
}
