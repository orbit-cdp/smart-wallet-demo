import { Box, Typography } from "@mui/material";
import { TbFaceId, TbFingerprint } from "react-icons/tb";
import { BackButton, StyledTextField, ActionButton } from "./StyledComponents";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface RegisterViewProps {
    loading: boolean;
    passkeyName: string;
    onPasskeyNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBackClick: () => void;
    onRegisterClick: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
    loading,
    passkeyName,
    onPasskeyNameChange,
    onBackClick,
    onRegisterClick,
}) => (
    <Box sx={{ width: "100%" }}>
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
            Register Wallet
        </Typography>
        <StyledTextField
            value={passkeyName}
            onChange={onPasskeyNameChange}
            placeholder="Enter passkey name"
            variant="outlined"
            fullWidth
        />
        <ActionButton
            onClick={onRegisterClick}
            disabled={loading}
            startIcon={<TbFaceId size={24} />}
            endIcon={<TbFingerprint size={24} />}
            fullWidth
        >
            {loading ? "Loading..." : "Register"}
        </ActionButton>
    </Box>
);
