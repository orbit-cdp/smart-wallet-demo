import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account, native, send_transaction } from "../lib/passkey";
import base64url from "base64url";

export interface WalletState {
    isConnected: boolean;
    keyId: string | null;
    contractId: string | null;
    balances: {
        native: string;
    };
}

const initialState: WalletState = {
    isConnected: false,
    keyId: null,
    contractId: null,
    balances: {
        native: "",
    },
};

export const registerWallet = createAsyncThunk(
    "wallet/register",
    async (passkeyName: string, { dispatch }) => {
        const {
            keyId: kid,
            contractId: cid,
            xdr,
        } = await account.createWallet("Perps", passkeyName);
        if (xdr) {
            await send_transaction(xdr);
        }

        const newKeyId = base64url(kid);
        localStorage.setItem("sp:keyId", newKeyId);
        localStorage.setItem(`sp:cId:${newKeyId}`, cid);

        dispatch(setKeyId(newKeyId));
        dispatch(setContractId(cid));
        dispatch(setConnected(true));
    }
);

export const connectWallet = createAsyncThunk(
    "wallet/connect",
    async (_, { dispatch }) => {
        const { keyId: kid, contractId: cid } = await account.connectWallet({
            getContractId: async (keyId: string) => {
                const storedContractId = localStorage.getItem(
                    `sp:cId:${keyId}`
                );
                if (storedContractId) return storedContractId;
                throw new Error("Contract ID not found");
            },
        });

        const newKeyId = base64url(kid);
        localStorage.setItem("sp:keyId", newKeyId);
        localStorage.setItem(`sp:cId:${newKeyId}`, cid);

        dispatch(setKeyId(newKeyId));
        dispatch(setContractId(cid));
        dispatch(setConnected(true));

        return { keyId: newKeyId, contractId: cid };
    }
);

export const getWalletBalance = createAsyncThunk(
    "wallet/getBalance",
    async (_, { getState }) => {
        const state = getState() as { wallet: WalletState };
        const { contractId } = state.wallet;
        if (contractId) {
            const nativeBalance = await native.balance({ id: contractId });
            return {
                native: nativeBalance.result.toString(),
            };
        } else {
            return {
                native: "",
            };
        }
    }
);

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setConnected(state, action) {
            state.isConnected = action.payload;
        },
        setKeyId(state, action) {
            state.keyId = action.payload;
        },
        setContractId(state, action) {
            state.contractId = action.payload;
        },
        setBalances(state, action) {
            state.balances = action.payload;
        },
        resetWallet(state) {
            state.isConnected = false;
            state.keyId = null;
            state.contractId = null;
            state.balances = {
                native: "",
            };
            localStorage.removeItem("sp:keyId");
            if (state.keyId) localStorage.removeItem(`sp:cId:${state.keyId}`);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWalletBalance.fulfilled, (state, action) => {
                state.balances = action.payload;
            })
            .addCase(registerWallet.fulfilled, (state) => {
                state.isConnected = true;
            })
            .addCase(connectWallet.fulfilled, (state) => {
                state.isConnected = true;
            });
    },
});

export const {
    setConnected,
    setKeyId,
    setContractId,
    setBalances,
    resetWallet,
} = walletSlice.actions;

export default walletSlice.reducer;
