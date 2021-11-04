import { MutableRefObject, useEffect } from "react";

export default function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  handleClickOutside: () => void
) {
  function handle(event: MouseEvent) {
    if (ref && ref.current && !ref.current.contains(event.target as Node)) {
      handleClickOutside();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, [ref]);
}
