'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransitionProps } from '@/core/types/common-utils';

const CSSTransition: React.FC<CSSTransitionProps> = ({
  in: inProp,
  timeout,
  classNames,
  children,
  onEnter,
  onExit,
}) => {
  const nodeRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const updateClasses = useCallback(
    (node: HTMLElement, addClasses: string[], removeClasses: string[]) => {
      removeClasses.forEach((cls) =>
        node.classList.remove(`${classNames}-${cls}`)
      );
      addClasses.forEach((cls) => node.classList.add(`${classNames}-${cls}`));
    },
    [classNames]
  );

  const cleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    setMounted(true);
    return () => {
      cleanup();
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !nodeRef.current) return;

    const node = nodeRef.current;
    cleanup();

    const performTransition = async () => {
      if (inProp) {
        node.style.display = '';
        updateClasses(node, ['enter'], ['exit', 'exit-active', 'exit-done']);
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve())
        );
        void node.scrollTop;
        updateClasses(node, ['enter-active'], []);
        onEnter?.();
      } else {
        updateClasses(node, ['exit'], ['enter', 'enter-active', 'enter-done']);
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve())
        );
        void node.scrollTop;
        updateClasses(node, ['exit-active'], []);
        onExit?.();
        timeoutRef.current = setTimeout(() => {
          updateClasses(node, ['exit-done'], ['exit', 'exit-active']);
        }, timeout.exit);
      }
    };

    performTransition();
  }, [
    inProp,
    mounted,
    classNames,
    timeout.enter,
    timeout.exit,
    onEnter,
    onExit,
    updateClasses,
  ]);

  return React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      nodeRef.current = node;
      const childRef = (children as { ref?: React.Ref<HTMLElement> }).ref;

      if (childRef) {
        if (typeof childRef === 'function') {
          childRef(node);
        } else {
          // eslint-disable-next-line
          (childRef as React.MutableRefObject<HTMLElement | null>).current =
            node;
        }
      }
    },
    onMouseEnter: () => {
      if (nodeRef.current) {
        cleanup();
        updateClasses(
          nodeRef.current,
          ['enter-done'],
          ['exit', 'exit-active', 'exit-done']
        );
      }
    },
    className: `${
      (children.props as { className?: string }).className || ''
    } ${classNames}`.trim(),
    style: {
      ...((children.props as { style?: React.CSSProperties }).style || {}),
      display: mounted ? undefined : 'none',
    },
  } as React.HTMLAttributes<HTMLElement>);
};

export { CSSTransition };
