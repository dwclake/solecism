/*
 * The entrypoint for the frontend, sourced from index.html
 */

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./features/store";
import { App } from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* fonts (migrated from styles/utils/fonts.scss) */
.abril-fatface-regular {
  font-family: "Abril Fatface", serif;
  font-weight: bold;
  font-style: normal;
}

.roboto {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.courier-prime-regular {
  font-family: "Courier Prime", monospace;
  font-weight: 400;
  font-style: normal;
}

.courier-prime-bold {
  font-family: "Courier Prime", monospace;
  font-weight: 700;
  font-style: normal;
}

.courier-prime-regular-italic {
  font-family: "Courier Prime", monospace;
  font-weight: 400;
  font-style: italic;
}

.courier-prime-bold-italic {
  font-family: "Courier Prime", monospace;
  font-weight: 700;
  font-style: italic;
}

.intel-one-mono {
  font-family: "Intel One Mono", monospace;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

/* basic global styles (migrated from styles/index.scss) */
html, body, #root {
  height: 100%;
  width: 100%;

  font-size: 10px;

  padding: 0;
  margin: 0;

  color: rgb(55, 44, 47);
  background-color: rgb(99, 88, 91);
}
`;

const container = document.getElementById("root")!;

const app = (
    <>
        <GlobalStyle />
        <Provider store={store}>
            <App />
        </Provider>
    </>
);

const root = createRoot(container);
root.render(app);