import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { TextField, Button, Box, Checkbox, FormControlLabel, Typography, Divider, IconButton } from '@mui/material';
import { Google as GoogleIcon, Close as CloseIcon } from '@mui/icons-material';
import "./LoginForm.css";
import SignUpForm from './SignUpForm';

// Définir l'interface des props
interface LoginFormProps {
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ showLogin, setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = () => {
    console.log('Logging in with email:', email);
  };


  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse =>{
      
      console.log(tokenResponse)
    } ,
  });


  return (
    <>
      {showLogin && (
        <Box
          sx={{
            width: 400,
            padding: 2,
            backgroundColor: '#2c2f36',
            borderRadius: 2,
            boxShadow: 3,
            position: 'absolute', // Pour positionner le bouton de fermeture
            top: '80px',
            right: '50px',
            zIndex: 999999,
          }}
        >
          {/* Bouton de fermeture */}
          <IconButton
            onClick={() => setShowLogin(false)} // Correction ici
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', marginBottom: 2 }}>Log in</Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ marginBottom: 2, backgroundColor: '#db4437', color: 'white' }}
            startIcon={<GoogleIcon />}
            onClick={()=>loginWithGoogle()}
          >
            Continue With Google
          </Button>


          <Divider sx={{ borderColor: 'white', color : "white", marginY: 2 }}><Typography>Login With Email</Typography> </Divider>


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

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                sx={{ color: 'white' }}
              />
            }
            label="Remember me"
            sx={{ color: 'white' }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ marginBottom: 2, backgroundColor: '#1e88e5' }}
            onClick={handleLogin}
          >
            Log in with email
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'white' }}>
              <a href="#!" style={{ color: '#1e88e5' }}>Forgot Password?</a>
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant="body2" sx={{ color: 'white' }}>
              DON'T HAVE AN ACCOUNT? <a href="#" onClick={()=>setShowSignUp(true)} style={{ color: '#1e88e5' }}>Create account</a>
            </Typography>
          </Box>
        </Box>
      )}
      <SignUpForm showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
    </>
  );
};

export default LoginForm;
