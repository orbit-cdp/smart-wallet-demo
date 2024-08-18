import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
