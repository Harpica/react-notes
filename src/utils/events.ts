function on(eventType: string, listener: EventListener) {
  document.addEventListener(eventType, listener);
}

function off(eventType: string, listener: EventListener) {
  document.removeEventListener(eventType, listener);
}

function once(eventType: string, listener: EventListener) {
  on(eventType, handleEventOnce);

  function handleEventOnce(event: Event) {
    listener(event);
    off(eventType, handleEventOnce);
  }
}

function trigger(eventType: string, data?: any) {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
  console.log("trigger");
}

function isCustomEvent(event: Event): event is CustomEvent {
  return "detail" in event;
}

export { on, once, off, trigger, isCustomEvent };
