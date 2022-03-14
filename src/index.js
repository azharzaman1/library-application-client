import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/system";
import { muiTheme } from "./theming/muiTheme";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
