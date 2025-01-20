import "@testing-library/jest-dom";

// Polyfill `adoptedStyleSheets` globally for both `Document` and `ShadowRoot`
const adoptedSheetsStore = new WeakMap();

if (!("adoptedStyleSheets" in Document.prototype)) {
  Object.defineProperty(Document.prototype, "adoptedStyleSheets", {
    get() {
      return adoptedSheetsStore.get(this) || [];
    },
    set(sheets: CSSStyleSheet[]) {
      adoptedSheetsStore.set(this, sheets);
    },
  });
}

if (!("adoptedStyleSheets" in ShadowRoot.prototype)) {
  Object.defineProperty(ShadowRoot.prototype, "adoptedStyleSheets", {
    get() {
      return adoptedSheetsStore.get(this) || [];
    },
    set(sheets: CSSStyleSheet[]) {
      adoptedSheetsStore.set(this, sheets);
    },
  });
}

// Polyfill CSSStyleSheet to provide `replaceSync`
if (!("replaceSync" in CSSStyleSheet.prototype)) {
  Object.defineProperty(CSSStyleSheet.prototype, "replaceSync", {
    value(cssText: string) {
      this.cssText = cssText;
      return cssText;
    },
  });
}

// Mock attachInternals for Shadow DOM internals
if (!("attachInternals" in Element.prototype)) {
  Object.defineProperty(Element.prototype, "attachInternals", {
    value() {
      // Return a simple object to satisfy the method call
      return {
        role: "",
        setFormValue: () => {},
      };
    },
  });
}
