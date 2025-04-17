import React from 'react';
import { Toast } from '../common/Toast';

const MovementToast = ({ showToast, setShowToast, toastType, setToastType, message }) => {
  const handleClose = () => {
    setShowToast(false);
    setToastType('success'); // Reset to default state
  };

  return (
    <Toast
      message={message}
      isVisible={showToast}
      onClose={handleClose}
      type={toastType}
    />
  );
};

export default MovementToast;

export const showErrorToast = (setToastType, setShowToast) => {
  setToastType('error');
  setShowToast(true);
};

export const showSuccessToast = (setToastType, setShowToast) => {
  setToastType('success');
  setShowToast(true);
};
