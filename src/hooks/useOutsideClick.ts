import { useEffect, type RefObject, type SetStateAction } from "react";

interface IuseOutsideClickProps {
  ref: RefObject<HTMLDivElement | null>;
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
}

// Реализация обработчика по клику вне окна
export const useOutsideClick = ({
  ref,
  visible,
  setVisible,
}: IuseOutsideClickProps) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref?.current && !ref.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [visible, ref, setVisible]);
};
