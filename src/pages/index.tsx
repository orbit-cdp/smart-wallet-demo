import type { NextPage } from "next";
import { Container } from "@mui/material";
import WalletDemo from "../components/WalletDemo";

const Home: NextPage = () => {
    return (
        <Container maxWidth="sm">
            <WalletDemo />
        </Container>
    );
};

export default Home;
