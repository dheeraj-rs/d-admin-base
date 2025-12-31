import { useRef, useEffect, useCallback } from 'react';

export function useScrollLock(
  autoLock: boolean = false,
  lockTarget: HTMLElement | string | null = null,
  widthReflow = true
) {
  const target = useRef<HTMLElement | null>(null);
  const originalStyle = useRef<{
    overflow: string;
    paddingRight: string;
  } | null>(null);

  const enableScrollLock = useCallback(() => {
    if (target.current) {
      const { overflow, paddingRight } = target.current.style;
      originalStyle.current = { overflow, paddingRight };

      if (widthReflow) {
        const offsetWidth = window.innerWidth - document.body.offsetWidth;
        if (offsetWidth > 0) {
          target.current.style.paddingRight = `${offsetWidth}px`;
        }
      }

      target.current.style.overflow = 'hidden';
    }
  }, [widthReflow]);

  const disableScrollLock = useCallback(() => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = originalStyle.current.overflow;
      target.current.style.paddingRight = originalStyle.current.paddingRight;
      originalStyle.current = null;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (typeof lockTarget === 'string') {
        target.current = document.querySelector(lockTarget);
      } else {
        target.current = (lockTarget as HTMLElement) || document.body;
      }
    }
  }, [lockTarget]);

  useEffect(() => {
    if (autoLock) {
      enableScrollLock();
    } else {
      disableScrollLock();
    }
  }, [autoLock, enableScrollLock, disableScrollLock]);

  useEffect(() => {
    return () => {
      disableScrollLock();
    };
  }, [disableScrollLock]);

  return { isLocked: autoLock, enableScrollLock, disableScrollLock };
}
