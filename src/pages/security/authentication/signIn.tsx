import React, { ReactElement, FC, useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthStart } from "../../../redux/actionCreators/authActions";

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
  const dispatch = useDispatch(); // Add this line to get the dispatch function

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  interface values {
    userId: string;
    password: string;
  }

  const initialValues: values = {
    userId: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("ユーザーIDを入力してください"),
    password: Yup.string().required("パスワードを入力してください"),
  });

  const handleSubmit = (values: values) => {
    dispatch(AuthStart(values.userId, values.password)); 
    console.log(values);
  };

  return (
    <Box
      display="block"
      m="auto"
      px={3}
      pt={3}
      width={400}
      borderRadius={4}
      boxShadow={12}
      sx={{ backgroundColor: "#ffffff" }}
    >
      <Box
        flexGrow={1}
        display="flex"
        py={2}
        px={3}
        sx={{
          justifyContent: "center",
          backgroundColor: "inherit",
        }}
      >
        <Typography variant="h6">ログイン</Typography>
      </Box>
      <Box display="block" px={3} mb={3}>
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
                  sx={{ fontSize: { xs: "9pt", sm: "9pt", md: "10pt" } }}
                >
                  <InputLabel
                    htmlFor="outlined-input-user-id"
                    sx={{ fontSize: { xs: "9pt", sm: "10pt", md: "11pt" } }}
                  >
                    ユーザーID
                  </InputLabel>
                  <Field
                    as={OutlinedInput}
                    id="outlined-input-user-id"
                    type="text"
                    name="userId"
                    value={formikProps.values.userId} // Update the 'value' attribute
                    aria-describedby="my-helper-text"
                    label="ユーザーID"
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
                  sx={{ fontSize: { xs: "9pt", sm: "9pt", md: "10pt" } }}
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    sx={{ fontSize: { xs: "9pt", sm: "10pt", md: "11pt" } }}
                  >
                    パスワード
                  </InputLabel>
                  <Field
                    as={OutlinedInput}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
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
                    label="パスワード"
                  />
                  {!!formikProps.touched.password &&
                    !!formikProps.errors.password && ( // New conditional render
                      <FormHelperText error>
                        {formikProps.errors.password}
                      </FormHelperText>
                    )}
                </FormControl>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  pt={1}
                  flexGrow={1}
                  sx={{ backgroundColor: "inherit" }}
                >
                  <FormControlLabel
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: { xs: "9pt", sm: "9pt", md: "10pt" },
                      },
                    }}
                    control={<Checkbox size="small" />}
                    label={"次回から自動的にログインする"}
                  />
                  <Link
                    href="/auth/forgetpassword"
                    sx={{
                      mt: 1,
                      fontSize: { xs: "9pt", sm: "9pt", md: "10pt" },
                      textDecoration: "none",
                      fontColor: "black",
                    }}
                  >
                    パスワードを忘れましたか?
                  </Link>
                </Box>
                <Box display="block" justifyContent="center" py={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    // onClick={()=>{handleOnSubmit()}}
                    sx={{ fontSize: { xs: "9pt", sm: "9pt", md: "10pt" } }}
                  >
                    ログインする
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </ThemeProvider>

        {/* <Divider sx={{pb:1, fontSize:{xs:'9pt', sm:'10pt', md:'11pt'}}}>でログイン</Divider> */}
        {/* <Box 
          display='flex'
          justifyContent='center'
        >
          <Button sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt'}}} variant="outlined" startIcon={<Google sx={{mr:0}}/>}>Google</Button>
          <Button sx={{mx:1, fontSize:{xs:'8pt', sm:'8pt', md:'9pt'}}} variant="outlined" startIcon={<Twitter sx={{mr:0}}/>}>Twitter</Button>
          <Button sx={{fontSize:{xs:'8pt', sm:'8pt', md:'9pt'}}} variant="outlined" startIcon={<Facebook sx={{mr:0}}/>}>Facebook</Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default SignIn;
