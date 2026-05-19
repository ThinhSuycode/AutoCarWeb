import { useState, useCallback } from "react";

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
  onConfirm: () => void;
}

export const useConfirm = () => {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        ...options,
        isOpen: true,
        onConfirm: () => resolve(true),
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state.onConfirm();
    setState((prev) => ({ ...prev, isOpen: false }));
  }, [state]);

  const handleCancel = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    confirm,
    confirmProps: {
      isOpen: state.isOpen,
      title: state.title,
      message: state.message,
      confirmText: state.confirmText,
      cancelText: state.cancelText,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    },
  };
};
