import { CssBaseline, ThemeProvider } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { theme } from "./styles/GlobalStyle";
import React from "react";
import AppRoutes from "./routes/routes";
import "../src/assets/css/style.css";
function App() {
  dayjs.locale("ja");
  const locales = ["en", "en-gb", "zh-cn", "de"];

  type LocaleKey = (typeof locales)[number];

  const [locale, setLocale] = React.useState<LocaleKey>("ja");

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
          <CssBaseline />
          <AppRoutes />
        </LocalizationProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
