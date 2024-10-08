import { PasskeyKit, PasskeyServer, SACClient } from "passkey-kit";
import { Account, Keypair, SorobanRpc, StrKey } from "@stellar/stellar-sdk";
import { Buffer } from "buffer";
import { toast } from "react-toastify";

const contract = require("@stellar/stellar-sdk/contract");
const basicNodeSigner = contract.basicNodeSigner;

export const rpc = new SorobanRpc.Server(
    "https://soroban-testnet.stellar.org"
);

export const mockPubkey = StrKey.encodeEd25519PublicKey(Buffer.alloc(32));
export const mockSource = new Account(mockPubkey, "0");

export const fundKeypair = new Promise<Keypair>(async (resolve) => {
    const now = new Date();

    now.setMinutes(0, 0, 0);

    const nowData = new TextEncoder().encode(now.getTime().toString());
    const hashBuffer = await crypto.subtle.digest("SHA-256", nowData);
    const keypair = Keypair.fromRawEd25519Seed(Buffer.from(hashBuffer));

    rpc.requestAirdrop(keypair.publicKey()).catch(() => {});

    resolve(keypair);
});

export const fundPubkey = (await fundKeypair).publicKey();
export const fundSigner = basicNodeSigner(
    await fundKeypair,
    "Test SDF Network ; September 2015"
);

export const account = new PasskeyKit({
    rpcUrl: "https://soroban-testnet.stellar.org",
    networkPassphrase: "Test SDF Network ; September 2015",
    factoryContractId:
        "CDKAGY7RBMIUDFZEUNZDQG4LGAJOMQP42NYNBZF5ZT5AAILO7GUALQBY",
});

export const sac = new SACClient({
    rpcUrl: "https://soroban-testnet.stellar.org",
    networkPassphrase: "Test SDF Network ; September 2015",
});

export const native = sac.getSACClient(
    "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
);

export const ousd = sac.getSACClient(
    "CCIL2PEJSWL3VYFAJMQSY4BG2UEQ7GHTGAV5YKYNNDOTXQXLPTTBJJWW"
);

export const send_transaction = async (xdr: string, fee = 10_000) => {
    const submittingToast = toast.info("Submitting transaction...", {
        position: "top-right",
        autoClose: false, // Don't auto close this toast
        hideProgressBar: false,
        closeOnClick: false, // Don't close on click
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const data = new FormData();
    const jwt =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxYzUxMDdmZjU4MzM4MDFkMDBmNmZhMjI3NzAzODY0NzNhMjY1ZmM5ZDhlZTVjMGYwN2U0NGIzYTRmNzAzMjU5IiwiZXhwIjoxNzMwNTQzNjQ5LCJjcmVkaXRzIjoxMDAwMDAwMDAwLCJpYXQiOjE3MjMyODYwNDl9.GwJfFIQ9q8m0qYusqHZQCNhJGf7ktB3o18Oq5Q3u9hI";

    data.set("xdr", xdr);
    data.set("fee", fee.toString());

    try {
        const response = await fetch("https://testnet.launchtube.xyz", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            body: data,
        });

        if (response.ok) {
            const result = await response.json();

            // Close the submitting toast if it exists
            if (submittingToast) {
                toast.dismiss(submittingToast);
            }

            // Show success notification
            toast.success("Transaction submitted successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return result;
        } else {
            const errorData = await response.json();
            throw errorData;
        }
    } catch (error) {
        console.error("Transaction failed:", error);

        // Show error notification
        toast.error("Transaction failed. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        throw error;
    }
};
