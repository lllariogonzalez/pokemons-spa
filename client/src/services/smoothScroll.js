export default function smoothScroll(pos) {
    let i = pos || 0;
    if (i > 0) {
      setTimeout(() => {
        window.scroll(0, i);
        smoothScroll(i - 30);
      }, 10);
    }
  };