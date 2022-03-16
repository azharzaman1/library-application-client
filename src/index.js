import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/system";
import { Provider } from "react-redux";
import { muiTheme } from "./theming/muiTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./redux/store";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <ThemeProvider theme={muiTheme}>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </ThemeProvider>
          </SnackbarProvider>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
