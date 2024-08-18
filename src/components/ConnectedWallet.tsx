import React from "react";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LaunchIcon from "@mui/icons-material/Launch";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/system";

interface ConnectedWalletProps {
    contractId: string;
    balance: string;
    onDisconnect: () => void;
}

const RoundedIconButton = styled("button")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: "none",
    borderRadius: "9999px",
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "opacity 0.3s",
    "&:hover": {
        opacity: 0.8,
    },
}));

export const ConnectedWallet: React.FC<ConnectedWalletProps> = ({
    contractId,
    balance,
    onDisconnect,
}) => {
    const theme = useTheme();
    const shortenAddress = (address: string) =>
        `${address.slice(0, 4)}...${address.slice(-4)}`;

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
            >
                Wallet Connected
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        Contract ID
                    </Typography>
                    <Typography variant="body1">
                        {shortenAddress(contractId)}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        Balance
                    </Typography>
                    <Typography variant="body1">{balance} XLM</Typography>
                </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <RoundedIconButton
                    onClick={() => navigator.clipboard.writeText(contractId)}
                >
                    <ContentCopyIcon />
                </RoundedIconButton>
                <RoundedIconButton
                    onClick={() =>
                        window.open(
                            `https://stellar.expert/explorer/testnet/contract/${contractId}`,
                            "_blank"
                        )
                    }
                >
                    <LaunchIcon />
                </RoundedIconButton>
                <RoundedIconButton onClick={onDisconnect}>
                    <LogoutIcon />
                </RoundedIconButton>
            </Box>
        </Box>
    );
};
