// src/components/WalletDemo/StyledComponents.tsx
import { styled } from "@mui/material/styles";
import { Button, TextField, Paper, IconButton } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
    "& .MuiOutlinedInput-root": {
        color: theme.palette.text.primary,
        "& fieldset": {
            borderColor: "transparent",
        },
        "&:hover fieldset": {
            borderColor: "transparent",
        },
        "&.Mui-focused fieldset": {
            borderColor: "transparent",
        },
    },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "12px",
    padding: theme.spacing(1.5),
    "&:hover": {
        opacity: 0.8,
        backgroundColor: theme.palette.primary.main,
    },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    borderRadius: "12px",
    padding: theme.spacing(1.5),
    "&:hover": {
        opacity: 0.8,
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "16px",
    width: "400px",
    margin: "0 auto",
}));

export const BackButton = styled(Button)(({ theme }) => ({
    alignSelf: "flex-start",
    color: theme.palette.text.secondary,
    "&:hover": {
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
    },
}));

export const WhiteIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.common.white,
}));
