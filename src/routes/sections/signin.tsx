import * as React from 'react';
import { useState } from 'react';

import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, Container, Paper, Grid, TextField, Button, Link } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';

import { useAuthContext } from '../../auth/hooks';
import { signInWithPassword } from '../../auth/context/jwt';

const LoginContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1048,
  margin: 'auto',
  border: '1px solid #A8B3CF',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FormContainer = styled(Box)({
  flex: 1,
  paddingRight: '2rem',
  borderRight: '1px solid #A8B3CF',
});

const InfoContainer = styled(Box)({
  flex: 1,
  paddingLeft: '2rem',
});

export function SigninView(){
  
  const router = useRouter();

  const { checkUserSession } = useAuthContext();


  const defaultValues = {
    email: 'funds@ukpact.cc',
    password: '@2Fund',
  };


  const handleSubmit = async (event:any) => {
    event.preventDefault();
    
    try {
      //alert('this')
      await signInWithPassword({ email: defaultValues.email, password: defaultValues.password });
      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
      <AppBar position="static" sx={{ backgroundColor: '#011E62', padding: 2 }} />
       
      <img src={`${CONFIG.assetsDir}/logo/uk-pact.png`}  width="120" height="100" />
      <Typography variant="h5" sx={{ mt: 4, fontWeight: 'bold', color: '#011E62' }}>
        Welcome to UK Pact’s Application Portal
      </Typography>
      
      <Container sx={{ mt: 4 }}>
        <LoginContainer>
          <FormContainer>
            <Typography variant="h6" fontWeight="bold" color="#011E62">Login</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please enter your details below:
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Email Address" variant="outlined" fullWidth sx={{ mb: 2 }} value={defaultValues.email}  />
              <TextField label="Password" type="password" variant="outlined" fullWidth sx={{ mb: 2 }} value={defaultValues.password}  />
              <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                <Link href="#" variant="body2" color="#A8B3CF">Forgot password?</Link>
                <Link href="#" variant="body2" color="#F44336">New User? Sign Up</Link>
              </Box>
              <Button type="submit" variant="outlined" fullWidth sx={{ borderColor: '#F44336', color: '#F44336' }}>
                Sign In
              </Button>
            </form>
          </FormContainer>
          
          <InfoContainer textAlign='left'> 
            <Typography variant="h6" fontWeight="bold" color="#000" >New Applicants</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} >
              To begin a new application, click on the Sign Up button. Your account will be created and tied to your email address.
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="#000">Existing Applicants</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enter your username and password to access your account and complete your application.
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="#000">Forgot Password</Typography>
            <Typography variant="body2" color="text.secondary">
              Click on the Forgot password button, and enter your email address to reset your password.
            </Typography>
          </InfoContainer>
        </LoginContainer>
      </Container>
    </Box>
  );
}
