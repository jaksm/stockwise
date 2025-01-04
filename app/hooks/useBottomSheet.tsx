import {useState} from 'react';

export type BottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function useBottomSheet() {
  const [isVisible, setIsVisible] = useState(false);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);
  const toggle = () => setIsVisible(prev => !prev);

  return {
    open,
    close,
    toggle,
    props: {
      isVisible,
      onClose: close,
    } as BottomSheetProps,
  };
}
