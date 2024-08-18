// src/components/WalletDemo/WalletComponents.tsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LaunchIcon from "@mui/icons-material/Launch";
import LogoutIcon from "@mui/icons-material/Logout";
import { WhiteIconButton } from "./StyledComponents";

interface ConnectedWalletProps {
    contractId: string;
    balance: string;
    onDisconnect: () => void;
}

export const ConnectedWallet: React.FC<ConnectedWalletProps> = ({
    contractId,
    balance,
    onDisconnect,
}) => {
    const theme = useTheme();
    const shortenAddress = (address: string) =>
        `${address.slice(0, 4)}...${address.slice(-4)}`;

    return (
        <Box sx={{ width: "100%" }}>
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
                align="center"
            >
                Wallet Connected
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography
                    variant="body1"
                    sx={{ color: theme.palette.text.secondary }}
                >
                    {shortenAddress(contractId)}
                </Typography>
                <Typography variant="body1">{balance} XLM</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <WhiteIconButton
                    onClick={() => navigator.clipboard.writeText(contractId)}
                >
                    <ContentCopyIcon />
                </WhiteIconButton>
                <WhiteIconButton
                    onClick={() =>
                        window.open(
                            `https://stellar.expert/explorer/testnet/contract/${contractId}`,
                            "_blank"
                        )
                    }
                >
                    <LaunchIcon />
                </WhiteIconButton>
                <WhiteIconButton onClick={onDisconnect}>
                    <LogoutIcon />
                </WhiteIconButton>
            </Box>
        </Box>
    );
};
