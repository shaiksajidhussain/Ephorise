type LenisScroll = {
  scrollTo: (
    target: number,
    options?: { duration?: number; force?: boolean; lock?: boolean; immediate?: boolean },
  ) => void;
};

let lenis: LenisScroll | null = null;

export function setLenis(instance: LenisScroll | null) {
  lenis = instance;
}

export function scrollToY(y: number) {
  if (lenis) {
    lenis.scrollTo(y, { duration: 0.7, force: true, lock: true });
    return;
  }
  window.scrollTo({ top: y, behavior: "smooth" });
}
