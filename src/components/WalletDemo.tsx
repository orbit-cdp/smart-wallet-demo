import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
    connectWallet,
    getWalletBalance,
    registerWallet,
    resetWallet,
    fundWallet,
    WalletState,
} from "../store/walletSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import { StyledPaper } from "./StyledComponents";
import { ConnectedWallet } from "./ConnectedWallet";
import { ConnectView } from "./ConnectView";
import { InitialView } from "./InitialView";
import { RegisterView } from "./RegisterView";

const WalletDemo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isConnected, contractId, balances, isFunded } = useSelector<
        RootState,
        WalletState
    >((state) => state.wallet);
    const [loading, setLoading] = useState(false);
    const [passkeyName, setPasskeyName] = useState("");
    const [viewState, setViewState] = useState<
        "initial" | "connect" | "register"
    >("initial");

    useEffect(() => {
        if (isConnected && !isFunded) {
            dispatch(fundWallet());
        }
    }, [isConnected, isFunded, dispatch]);

    useEffect(() => {
        if (isConnected && isFunded) {
            dispatch(getWalletBalance());
            setViewState("initial");
        }
    }, [isConnected, isFunded, dispatch]);

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
                // Note: We don't set viewState here anymore, it will be set in the useEffect
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

    const formatBalance = (balanceStr: string) => {
        const balanceNum = parseFloat(balanceStr);
        return (balanceNum / 10_000_000).toFixed(7);
    };

    const renderContent = () => {
        switch (viewState) {
            case "initial":
                if (isConnected) {
                    if (!isFunded) {
                        return (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                }}
                            >
                                <CircularProgress />
                                <Typography
                                    variant="body1"
                                    sx={{ ml: 2 }}
                                >
                                    Funding wallet...
                                </Typography>
                            </Box>
                        );
                    }
                    return (
                        <ConnectedWallet
                            contractId={contractId || ""}
                            balance={formatBalance(balances.native)}
                            onDisconnect={handleDisconnect}
                        />
                    );
                }
                return (
                    <InitialView
                        onConnectClick={() => setViewState("connect")}
                    />
                );
            case "connect":
                return (
                    <ConnectView
                        loading={loading}
                        onBackClick={() => setViewState("initial")}
                        onNewWalletClick={() => setViewState("register")}
                        onSignInClick={() => handleConnect("signin")}
                    />
                );
            case "register":
                return (
                    <RegisterView
                        loading={loading}
                        passkeyName={passkeyName}
                        onPasskeyNameChange={(e) =>
                            setPasskeyName(e.target.value)
                        }
                        onBackClick={() => setViewState("connect")}
                        onRegisterClick={() => handleConnect("register")}
                    />
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
