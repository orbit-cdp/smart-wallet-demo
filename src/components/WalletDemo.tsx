import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
    connectWallet,
    getWalletBalance,
    registerWallet,
    resetWallet,
    WalletState,
} from "../store/walletSlice";
import {
    Box,
    Button,
    Typography,
    TextField,
    IconButton,
    useTheme,
    Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TbFaceId, TbFingerprint } from "react-icons/tb";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LaunchIcon from "@mui/icons-material/Launch";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledTextField = styled(TextField)(({ theme }) => ({
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

const ActionButton = styled(Button)(({ theme }) => ({
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

const SecondaryButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    borderRadius: "12px",
    padding: theme.spacing(1.5),
    "&:hover": {
        opacity: 0.8,
        backgroundColor: theme.palette.secondary.main,
    },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "16px",
    width: "400px", // Set a fixed width
    margin: "0 auto",
}));

const BackButton = styled(Button)(({ theme }) => ({
    alignSelf: "flex-start",
    color: theme.palette.text.secondary,
    "&:hover": {
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
    },
}));

const FullWidthBox = styled(Box)({
    width: "100%",
});

const WhiteIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.common.white,
}));

const WalletDemo: React.FC = () => {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { isConnected, contractId, balances } = useSelector<
        RootState,
        WalletState
    >((state) => state.wallet);
    const [loading, setLoading] = useState(false);
    const [passkeyName, setPasskeyName] = useState("");
    const [viewState, setViewState] = useState<
        "initial" | "connect" | "register"
    >("initial");

    useEffect(() => {
        if (isConnected) {
            dispatch(getWalletBalance());
            setViewState("initial");
        }
    }, [isConnected, dispatch]);

    const handleConnect = useCallback(
        async (type: "signin" | "register") => {
            try {
                setLoading(true);
                if (type === "register") {
                    if (!passkeyName) {
                        alert("Please enter a name for your passkey.");
                        return;
                    }
                    await dispatch(registerWallet(passkeyName)).unwrap();
                } else {
                    await dispatch(connectWallet()).unwrap();
                }
                setViewState("initial");
            } catch (error) {
                console.error("Failed to connect:", error);
                alert("Failed to connect. Please try again.");
            } finally {
                setLoading(false);
            }
        },
        [passkeyName, dispatch]
    );

    const handleDisconnect = useCallback(() => {
        dispatch(resetWallet());
    }, [dispatch]);

    const shortenAddress = (address: string) =>
        `${address.slice(0, 4)}...${address.slice(-4)}`;

    const formatBalance = (balanceStr: string) => {
        const balanceNum = parseFloat(balanceStr);
        return (balanceNum / 10_000_000).toFixed(7);
    };

    const renderContent = () => {
        switch (viewState) {
            case "initial":
                if (isConnected) {
                    return (
                        <FullWidthBox>
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
                                    sx={{
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    {shortenAddress(contractId || "")}
                                </Typography>
                                <Typography variant="body1">
                                    {formatBalance(balances.native)} XLM
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <WhiteIconButton
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            contractId || ""
                                        )
                                    }
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
                                <WhiteIconButton onClick={handleDisconnect}>
                                    <LogoutIcon />
                                </WhiteIconButton>
                            </Box>
                        </FullWidthBox>
                    );
                } else {
                    return (
                        <FullWidthBox>
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
                                Connect your wallet to explore the features of
                                our demo application.
                            </Typography>
                            <ActionButton
                                onClick={() => setViewState("connect")}
                                startIcon={<TbFaceId size={24} />}
                                endIcon={<TbFingerprint size={24} />}
                                fullWidth
                            >
                                Connect Wallet
                            </ActionButton>
                        </FullWidthBox>
                    );
                }
            case "connect":
                return (
                    <FullWidthBox>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <BackButton
                                startIcon={<ArrowBackIcon />}
                                onClick={() => setViewState("initial")}
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
                                onClick={() => setViewState("register")}
                                startIcon={<TbFaceId size={24} />}
                                endIcon={<TbFingerprint size={24} />}
                                disabled={loading}
                                fullWidth
                            >
                                New Wallet
                            </ActionButton>
                            <SecondaryButton
                                onClick={() => handleConnect("signin")}
                                disabled={loading}
                                fullWidth
                            >
                                {loading ? "Loading..." : "Sign In"}
                            </SecondaryButton>
                        </Box>
                    </FullWidthBox>
                );
            case "register":
                return (
                    <FullWidthBox>
                        <BackButton
                            startIcon={<ArrowBackIcon />}
                            onClick={() => setViewState("connect")}
                        >
                            Back
                        </BackButton>
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            align="center"
                        >
                            Register Wallet
                        </Typography>
                        <StyledTextField
                            value={passkeyName}
                            onChange={(e) => setPasskeyName(e.target.value)}
                            placeholder="Enter passkey name"
                            variant="outlined"
                            fullWidth
                        />
                        <ActionButton
                            onClick={() => handleConnect("register")}
                            disabled={loading}
                            startIcon={<TbFaceId size={24} />}
                            endIcon={<TbFingerprint size={24} />}
                            fullWidth
                        >
                            {loading ? "Loading..." : "Register"}
                        </ActionButton>
                    </FullWidthBox>
                );
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <StyledPaper elevation={3}>{renderContent()}</StyledPaper>
        </Box>
    );
};

export default WalletDemo;
