import { FC, ReactNode } from "react";
import { Grid } from '@mui/material';
import { SignIn1 } from '../assets';


type AuthLayoutProps = {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Grid 
      container 
      width='100%'
      sx={{ height: {xs: '80vh', ms: '100vh', md: '100vh'}, backgroundSize:'cover'}}
    >
        {children}
    </Grid>
  )
};

export default AuthLayout;
