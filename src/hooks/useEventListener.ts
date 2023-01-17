import { RefObject, useEffect } from 'react';

export const useEventListener = <T extends HTMLElement | Document>(
  eventName: string,
  handler: (event: Event) => void,
  element?: RefObject<T>
): void => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const targetElement: T | Document = element?.current || document;
    if (!(targetElement && targetElement.addEventListener)) return;

    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName, element]);
};
