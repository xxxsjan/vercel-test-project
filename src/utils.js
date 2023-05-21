export function debounce(func, delay = 1000) {
  let timerId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(context, args), delay);
  };
}
export function throttle(func, delay = 1000) {
  let timerId;
  return function () {
    const context = this;
    const args = arguments;
    function run() {
      func.apply(context, args);
      timerId = null;
    }
    if (!timerId) {
      timerId = setTimeout(run, delay);
    }
  };
}
