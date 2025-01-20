import { ThemeProvider } from "@ui5/webcomponents-react";
import App from "./App";
import { render, screen } from "./utils/test-utils";

describe("App", () => {
  it("Throws error without polyfill/mock", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    expect(screen.getByText("UI5 WCR React App")).toBeInTheDocument();
  });
});
