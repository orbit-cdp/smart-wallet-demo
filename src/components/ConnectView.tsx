import React from "react";
import { Box, Typography } from "@mui/material";
import { TbFaceId, TbFingerprint } from "react-icons/tb";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ActionButton, SecondaryButton, BackButton } from "./StyledComponents";

interface ConnectViewProps {
    loading: boolean;
    onBackClick: () => void;
    onNewWalletClick: () => void;
    onSignInClick: () => void;
}

export const ConnectView: React.FC<ConnectViewProps> = ({
    loading,
    onBackClick,
    onNewWalletClick,
    onSignInClick,
}) => (
    <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <BackButton
                startIcon={<ArrowBackIcon />}
                onClick={onBackClick}
            >
                Back
            </BackButton>
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
                align="center"
            >
                Connect Wallet
            </Typography>
            <ActionButton
                onClick={onNewWalletClick}
                startIcon={<TbFaceId size={24} />}
                endIcon={<TbFingerprint size={24} />}
                disabled={loading}
                fullWidth
            >
                New Wallet
            </ActionButton>
            <SecondaryButton
                onClick={onSignInClick}
                disabled={loading}
                fullWidth
            >
                {loading ? "Loading..." : "Sign In"}
            </SecondaryButton>
        </Box>
    </Box>
);
