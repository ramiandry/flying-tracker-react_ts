import React, { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
  };

  return (
    <Box sx={{ width: 400, padding: 2, backgroundColor: '#2c2f36', borderRadius: 2, boxShadow: 3, marginX : "auto", marginTop :"30vh"}}>
      <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>Forgot Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 2,
            input: { color: 'white' }, // Changer la couleur du texte du champ
            span: { color: 'white' }, // Changer la couleur du texte de l'étiquette
            label: { color: 'white' }, // Changer la couleur du texte de l'étiquette
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {error && <Typography sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>}
        {message && <Typography sx={{ color: 'green', textAlign: 'center' }}>{message}</Typography>}
        
        <Button
          fullWidth
          variant="contained"
          sx={{ marginBottom: 2, backgroundColor: '#1e88e5' }}
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="primary" /> : "Send Reset Link"}
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPassword;
