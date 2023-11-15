import React, { ReactElement, FC, useState, useEffect, useRef } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCookies } from "react-cookie";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Link,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {
  Visibility,
  VisibilityOff,
  Google,
  Twitter,
  Facebook,
} from "@mui/icons-material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthOTPLogin, AuthStart } from "../../../redux/actionCreators/authActions";
import { remove } from "lodash";
import { ThemeColor } from "../../../styles/GlobalStyle";
import { RootState } from "../../../redux/store/store";
import { stat } from "fs";
import { serverUrl } from "../../../services/axios";

const theme = createTheme({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
        },
      },
    },
  },
});

const SignIn: FC = (): ReactElement => {
  const [showPassword, setShowPassword] = React.useState(false);
  const login_status = useSelector((state:RootState) => state.auth.login_status);
  const qrScan = useSelector((state:RootState) => state.auth.qrScan);

  const dispatch = useDispatch(); // Add this line to get the dispatch function
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [google2faSecret, setGoogle2faSecret] = useState('');
  const [user_id, setUser_Id] = useState('');
  const [password,  setPassword] = useState('');

  const [isOtpStep, setIsOtpStep] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  // const 

  interface values {
    userId: string;
    password: string;
  }

  const initialValues: values = {
    userId: "",
    password: "",
  };

  interface valuesOTP {
    digitalCode: string;
  }

  const initialValuesOTP: valuesOTP = {
    digitalCode:  ""
  }

  useEffect(() => {
    if(qrScan) {
      setQrCodeUrl(qrScan.qr_codeurl ? qrScan.qr_codeurl : '' );
      setGoogle2faSecret(qrScan.google2fa_secret ? qrScan.google2fa_secret : '' );
    }
  }, [qrScan])

  useEffect(() => {
    setLoginStatus(login_status);
  }, [login_status])
  
  const validationSchema = Yup.object({
    userId: Yup.string().required("ユーザーIDを入力してください"),
    password: Yup.string().required("パスワードを入力してください"),
  });

  const validationSchemaOTP = Yup.object({
    digitalCode: Yup.string().required("デジタルコードを入力してください"),
  });
  const handleSubmit = (values: values) => {
    dispatch(AuthStart(values.userId, values.password)); 
    setUser_Id(values.userId);
    setPassword(values.password);
  };

  const goToOTP = () => {
    setLoginStatus('OTP');
  }

  const handleOtpSubmit = (values: valuesOTP) => {
    console.log()
    dispatch(AuthOTPLogin(values.digitalCode, user_id, password)); 
  }

  return (
    <Box
      display="block"
      m="auto"
      px={3}
      // pt={3}
      width={500}
      borderRadius={4}      
      
      sx={{ boxShadow: {xs: 0, md: 12, ms:12}, backgroundColor: "#ffffff" }}
    >

      {loginStatus == '' && (
        <>
              <Box
        flexGrow={1}
        display="flex"
        py={2}
        px={2}
        sx={{
          justifyContent: "center",
          backgroundColor: "inherit",
        }}
      >
        <Typography sx={{fontSize: '2rem', color: ThemeColor.main, fontWeight: '600'}} variant="h4">ログイン</Typography>
      </Box>
      <Box display="block" px={2} mb={2}>
        <ThemeProvider theme={theme}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps: FormikProps<values>) => (
              <Form>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{mt: 2, fontSize: { xs: "9pt", sm: "9pt", md: "10pt" } }}
                >
                  {/* <InputLabel
                    htmlFor="outlined-input-user-id"
                    sx={{ fontSize: { xs: "9pt", sm: "10pt", md: "11pt" } }}
                  >
                    ユーザーID
                  </InputLabel> */}
                  <Typography sx={{fontSize: '1.1rem',mb: 1,ml: 1,  fontWeight: '600'}} variant="h4">ログイン</Typography>

                  <Field
                    as={OutlinedInput}
                    id="outlined-input-user-id"
                    type="text"
                    placeholder="ユーザーID"
                    sx={{fontSize: '1.2rem'}}
                    name="userId"
                    value={formikProps.values.userId} // Update the 'value' attribute
                    aria-describedby="my-helper-text"
                  />
                  {!!formikProps.touched.userId &&
                    !!formikProps.errors.userId && ( // New conditional render
                      <FormHelperText error>
                        {formikProps.errors.userId}
                      </FormHelperText>
                    )}

                  <br></br>
                </FormControl>

                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mt: 4,mb: 4,  fontSize: { xs: "9pt", sm: "9pt", md: "10pt" } }}
                >
                  <Typography sx={{fontSize: '1.1rem',mb: 1,  fontWeight: '600'}} variant="h4">パスワード</Typography>

                  <Field
                    as={OutlinedInput}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="パスワード"
                    sx={{fontSize: '1.2rem'}}
                    value={formikProps.values.password} // Update the 'value' attribute
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    
                    // label="パスワード"
                  />
                  {!!formikProps.touched.password &&
                    !!formikProps.errors.password && ( // New conditional render
                      <FormHelperText error>
                        {formikProps.errors.password}
                      </FormHelperText>
                    )}
                </FormControl>
           
                <Box display="block" justifyContent="center" py={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    sx={{ fontSize: { xs: "1.1rem", sm: "1.1rem", md: "1.3rem" } }}
                  >
                    ログインする
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </ThemeProvider>
      </Box>
        </>
      )}

      {loginStatus == 'QRSCAN' && (
        <>
          <Box sx={{textAlign: 'center'}}>
          <Typography sx={{ color: ThemeColor.main}} variant="h6">QRコードをスキャンしてください。</Typography>
            <Box>
            <img src={`${serverUrl}upload/qrcodes/${qrCodeUrl}`} alt="" />
            </Box>
            <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    sx={{ mb: 4 }}
                    onClick={()=>goToOTP()}
                  >
                    OTPログインページに移動します
                  </Button>
            </Box>
        </>
      )}

{loginStatus == 'OTP' && (
        <>
              <Box
        flexGrow={1}
        display="flex"
        py={2}
        px={2}
        sx={{
          justifyContent: "center",
          backgroundColor: "inherit",
        }}
      >
        <Typography sx={{fontSize: '2rem', color: ThemeColor.main, fontWeight: '600'}} variant="h4">ログイン</Typography>
      </Box>
      <Box display="block" px={2} mb={2}>
        <ThemeProvider theme={theme}>
          <Formik
            initialValues={initialValuesOTP}
            validationSchema={validationSchemaOTP}
            onSubmit={handleOtpSubmit}
          >
            {(formikProps: FormikProps<valuesOTP>) => (
              <Form>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{mt: 2, fontSize: { xs: "9pt", sm: "9pt", md: "10pt" } }}
                >

                  <Typography sx={{mb: 1,ml: 1,}} variant="h6">認証アプリで生成された OTP を入力してください。
                    30 秒ごとに更新されるため、必ず現在のものを送信してください。</Typography>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                      </AccordionSummary>
                      <AccordionDetails>
                          <Box sx={{textAlign:'center'}}>
                          <img src={`${serverUrl}upload/qrcodes/${qrCodeUrl}`} alt="" />
                          </Box>
                      </AccordionDetails>
                    </Accordion>

                          
                  <Field
                    as={OutlinedInput}
                    id="outlined-input-user-id"
                    type="text"
                    placeholder="6 デジタルコード"
                    sx={{fontSize: '1.2rem'}}
                    name="digitalCode"
                    value={formikProps.values.digitalCode} // Update the 'value' attribute
                    aria-describedby="my-helper-text"
                  />
                  {!!formikProps.touched.digitalCode &&
                    !!formikProps.errors.digitalCode && ( // New conditional render
                      <FormHelperText error>
                        {formikProps.errors.digitalCode}
                      </FormHelperText>
                    )}

                  <br></br>
                </FormControl>
           
                <Box display="block" justifyContent="center" py={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    sx={{ fontSize: { xs: "1.1rem", sm: "1.1rem", md: "1.3rem" } }}
                  >
                    ログインする
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </ThemeProvider>
      </Box>
        </>
      )}




    </Box>
  );
};

export default SignIn;
