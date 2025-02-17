import React, { useState } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox, Typography, Divider, IconButton } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, Apple as AppleIcon, Close as CloseIcon } from '@mui/icons-material';

// Définir l'interface des props
interface SignUpFormProps {
  showSignUp: boolean;
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ showSignUp, setShowSignUp }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    console.log('Signing up with email:', email);
  };
  

  return (
    <>
      {showSignUp && (
        <Box
          sx={{
            width: 400,
            padding: 2,
            backgroundColor: '#2c2f36',
            borderRadius: 2,
            boxShadow: 3,
            position: 'absolute',
            top: '80px',
            right: '50px',
            zIndex: 999999,
          }}
        >
          {/* Bouton de fermeture */}
          <IconButton
            onClick={() => setShowSignUp(false)}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', marginBottom: 2 }}>Sign Up</Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ marginBottom: 2, backgroundColor: '#db4437', color: 'white' }}
            startIcon={<GoogleIcon />}
          >
            Continue With Google
          </Button>

          <Divider sx={{ borderColor: 'white', color : "white", marginY: 2 }}><Typography>Login With Email</Typography> </Divider>

          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            sx={{ 
              marginBottom: 2,
              input: { color: 'white' }, // Changer la couleur du texte du champ
              span: { color: 'white' }, // Changer la couleur du texte de l'étiquette
              label: { color: 'white' }, // Changer la couleur du texte de l'étiquette
             }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ 
              marginBottom: 2,
              input: { color: 'white' }, // Changer la couleur du texte du champ
              span: { color: 'white' }, // Changer la couleur du texte de l'étiquette
              label: { color: 'white' }, // Changer la couleur du texte de l'étiquette
             }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ 
              marginBottom: 2,
              input: { color: 'white' }, // Changer la couleur du texte du champ
              span: { color: 'white' }, // Changer la couleur du texte de l'étiquette
              label: { color: 'white' }, // Changer la couleur du texte de l'étiquette
             }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                sx={{ color: 'white' }}
              />
            }
            label="I agree to the terms and conditions"
            sx={{ color: 'white' }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ marginBottom: 2, backgroundColor: '#1e88e5' }}
            onClick={handleSignUp}
          >
            Sign Up with email
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'white' }}>
              <a href="#!" style={{ color: '#1e88e5' }}>Forgot Password?</a>
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant="body2" sx={{ color: 'white' }}>
              ALREADY HAVE AN ACCOUNT? <a href="#!" style={{ color: '#1e88e5' }}>Log in</a>
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SignUpForm;
