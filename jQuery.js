window.jQuery = function (selectorOrArray) {
  let elements;
  let oldApi;
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
    oldApi = selectorOrArray.oldApi;
  }
  return {
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }
      return this;
    },
    find(selector) {
      const arr = [];
      for (let i = 0; i < elements.length; i++) {
        arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)));
      }
      arr.oldApi = this;
      return jQuery(arr);
    },
    end() {
      return oldApi;
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }
      return this;
    },
    print() {
      console.log(elements);
      return this;
    },
    parent() {
      const arr = [];
      this.each((element) => {
        if (arr.indexOf(element.parentNode) === -1) {
          arr.push(element.parentNode);
        }
      });
      return jQuery(arr);
    },
    children() {
      const arr = [];
      this.each((element) => {
        arr.push(...element.children);
      });
      return jQuery(arr);
    },
    siblings() {
      const arr = [];
      this.each((element) => {
        let children = Array.from(element.parentNode.children);
        let siblings = children.filter((child) => child !== element);
        for (let i = 0; i < siblings.length; i++) {
          if (arr.indexOf(siblings[i]) === -1) {
            arr.push(siblings[i]);
          }
        }
      });
      return jQuery(arr);
    },
    index() {
      const arr = [];
      this.each((element) => {
        const children = element.parentNode.children;
        for (let i = 0; i < children.length; i++) {
          if (children[i] === element) {
            arr.push(i);
          }
        }
      });
      console.log(arr);
      return this;
    },
    next() {
      const arr = [];
      this.each((element) => {
        arr.push(element.nextElementSibling);
      });
      return jQuery(arr);
    },
    prev() {
      const arr = [];
      this.each((element) => {
        arr.push(element.previousElementSibling);
      });
      return jQuery(arr);
    },
  };
};
