import React from "react";
import { Box, Typography } from "@mui/material";
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
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
        >
            Welcome to Wallet Demo
        </Typography>
        <Typography
            variant="body1"
            align="center"
            sx={{ mb: 2 }}
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
