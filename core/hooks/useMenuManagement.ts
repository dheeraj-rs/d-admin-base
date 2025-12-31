import { RefObject, useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEventListener } from './useEventListener';
import { useScrollLock } from './useScrollLock';

import { LayoutState } from '@/core/types/layout-store';
import { AppTopbarRef } from '@/core/types/admin-layout';

interface UseMenuManagementProps {
  layoutState: LayoutState;
  setLayoutState: (
    state: Partial<LayoutState> | ((prev: LayoutState) => LayoutState)
  ) => void;
  topbarRef: RefObject<AppTopbarRef | null>;
  menubarRef: RefObject<HTMLDivElement | null>;
  configbarRef: RefObject<HTMLDivElement | null>;
}

export const useMenuManagement = ({
  layoutState,
  setLayoutState,
  topbarRef,
  menubarRef,
  configbarRef,
}: UseMenuManagementProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { enableScrollLock, disableScrollLock } = useScrollLock();

  const hideMenu = useCallback(() => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      overlayConfigActive: false,
      staticMenuMobileActive: false,
      staticConfigMobileActive: false,
      menuHoverActive: false,
    }));
    disableScrollLock();
  }, [setLayoutState, disableScrollLock]);

  const hideProfileMenu = useCallback(() => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: false,
    }));
  }, [setLayoutState]);

  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: 'click',
      listener: (event) => {
        const isOutsideClicked = !(
          menubarRef.current?.isSameNode(event.target as Node) ||
          menubarRef.current?.contains(event.target as Node) ||
          configbarRef.current?.isSameNode(event.target as Node) ||
          configbarRef.current?.contains(event.target as Node) ||
          topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
          topbarRef.current?.menubutton?.contains(event.target as Node) ||
          topbarRef.current?.topbarmenu?.isSameNode(event.target as Node) ||
          topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
          topbarRef.current?.topbarmenubutton?.isSameNode(
            event.target as Node
          ) ||
          topbarRef.current?.topbarmenubutton?.contains(event.target as Node) ||
          topbarRef.current?.toolbarbutton?.isSameNode(event.target as Node) ||
          topbarRef.current?.toolbarbutton?.contains(event.target as Node)
        );

        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });

  const [
    bindProfileMenuOutsideClickListener,
    unbindProfileMenuOutsideClickListener,
  ] = useEventListener({
    type: 'click',
    listener: (event) => {
      const isOutsideClicked = !(
        topbarRef.current?.topbarmenu?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.contains(event.target as Node) ||
        topbarRef.current?.toolbarbutton?.isSameNode(event.target as Node) ||
        topbarRef.current?.toolbarbutton?.contains(event.target as Node)
      );

      if (isOutsideClicked) {
        hideProfileMenu();
      }
    },
  });

  useEffect(() => {
    hideMenu();
    hideProfileMenu();
  }, [pathname, searchParams, hideMenu, hideProfileMenu]);

  useEffect(() => {
    if (
      layoutState.overlayMenuActive ||
      layoutState.overlayConfigActive ||
      layoutState.staticMenuMobileActive ||
      layoutState.staticConfigMobileActive
    ) {
      bindMenuOutsideClickListener();
    }

    return () => {
      unbindMenuOutsideClickListener();
    };
  }, [
    layoutState.overlayMenuActive,
    layoutState.overlayConfigActive,
    layoutState.staticMenuMobileActive,
    layoutState.staticConfigMobileActive,
    bindMenuOutsideClickListener,
    unbindMenuOutsideClickListener,
  ]);

  useEffect(() => {
    if (layoutState.profileSidebarVisible) {
      bindProfileMenuOutsideClickListener();
    }

    return () => {
      unbindProfileMenuOutsideClickListener();
    };
  }, [
    layoutState.profileSidebarVisible,
    bindProfileMenuOutsideClickListener,
    unbindProfileMenuOutsideClickListener,
  ]);

  useEffect(() => {
    if (layoutState.staticMenuMobileActive) {
      enableScrollLock();
    } else {
      disableScrollLock();
    }
  }, [layoutState.staticMenuMobileActive, enableScrollLock, disableScrollLock]);

  useEffect(() => {
    if (layoutState.staticConfigMobileActive) {
      enableScrollLock();
    } else {
      disableScrollLock();
    }
  }, [
    layoutState.staticConfigMobileActive,
    enableScrollLock,
    disableScrollLock,
  ]);

  useEffect(() => {
    return () => {
      unbindMenuOutsideClickListener();
      unbindProfileMenuOutsideClickListener();
    };
  }, [unbindMenuOutsideClickListener, unbindProfileMenuOutsideClickListener]);
};
