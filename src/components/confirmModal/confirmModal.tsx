import React from 'react';
import {Button, Modal, Typography} from 'client-library';
import {ConfirmModalContent, ConfirmModalButtons, TriangleIcon} from './styles';
import {ConfirmModalProps} from './types';

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  handleConfirm,
  customContent,
  message,
  question,
  confirmText = 'Obriši',
  cancelText = 'Otkaži',
}) => {
  const buttonControls = (
    <ConfirmModalButtons>
      <Button content={confirmText} onClick={handleConfirm} variant="primary" />
      <Button content={cancelText} onClick={onClose} variant="secondary" />
    </ConfirmModalButtons>
  );

  const defaultContent = (
    <ConfirmModalContent>
      <TriangleIcon />
      <Typography content={question} variant="bodyLarge" style={{fontWeight: 600, marginBottom: 20}} />
      <Typography content={message} variant="bodyLarge" />
    </ConfirmModalContent>
  );

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose(true);
      }}
      width={450}
      leftButtonText="Potvrdi"
      rightButtonText="Otkaži"
      content={customContent ? customContent : defaultContent}
      customButtonsControls={buttonControls}
    />
  );
};
