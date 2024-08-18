import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3772FF",
        },
        secondary: {
            main: "#242D3D",
        },
        background: {
            default: "#1C2635",
            paper: "#283747",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "rgba(255, 255, 255, 0.5)",
        },
    },
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: "none",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "9999px",
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#1C2635",
                    borderRadius: "16px",
                },
            },
        },
    },
});

export default theme;
