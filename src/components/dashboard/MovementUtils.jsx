const autoExpand = (element) => {
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
};

const expandTextArea = (element, shouldExpand = true) => {
  if (!element || !element.value) return;
  
  if (shouldExpand) {
    autoExpand(element);
  }
};

export { autoExpand, expandTextArea };
