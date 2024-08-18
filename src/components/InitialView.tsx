import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { TbFaceId, TbFingerprint } from "react-icons/tb";
import { ActionButton } from "./StyledComponents";

interface InitialViewProps {
    onConnectClick: () => void;
}

export const InitialView: React.FC<InitialViewProps> = ({
    onConnectClick,
}) => (
    <Box sx={{ width: "100%" }}>
        <Typography
            variant="h5"
            component="h1"
            gutterBottom
        >
            Smart Wallets in React
        </Typography>
        <Divider sx={{ mb: 2, background: "white", opacity: 0.3 }} />
        <Typography
            variant="body2"
            sx={{ mb: 2, opacity: 0.7 }}
        >
            Connect your wallet to explore the features of our demo
            application.
        </Typography>
        <ActionButton
            onClick={onConnectClick}
            startIcon={<TbFaceId size={24} />}
            endIcon={<TbFingerprint size={24} />}
            fullWidth
        >
            Connect Wallet
        </ActionButton>
    </Box>
);
