// IsMobile | This utility function is used to check if the user is on a mobile device
export function isMobile() {
    return window.matchMedia("(any-hover: none)").matches;
  }