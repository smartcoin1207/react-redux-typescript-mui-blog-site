import { FC, useState, useEffect, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Box,
  Select,
  MenuItem,
  SvgIcon,
  Avatar,
  useTheme,
} from "@mui/material";
import { Menu, Search } from "@mui/icons-material";
import { Bell } from "../assets";
import { useProSidebar } from "react-pro-sidebar";
import {
  useSidebar,
  useSidebarSelectedMenuTitleContext,
  useTemplateThemeModeContext,
} from "../hooks";
import { TemplateThemeModeContextType } from "../context";
import { UserProfile, logout } from "../redux/actionCreators/authActions";
import { getUserFromToken } from "../util/util";
import { baseURL } from "../services/axios";
import { RootState } from "../redux/store/store";
import { useCookies } from "react-cookie";

interface IUser {
  name: string;
  user_id?: string | null;
  role_id?: string | null;
}

const Navbar: FC = (): ReactElement => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [cookies1, setCookie1, removeCookie1] = useCookies(["usertoken"]);

  const dispatch = useDispatch(); // Add this line to get the dispatch function
  const userInfo: any = useSelector((state: RootState) => state.auth.user);
  const [avatar, setAvatar] = useState("128.png");
  const { broken } = useProSidebar();
  const { toggle } = useSidebar();
  const { menuTitle } = useSidebarSelectedMenuTitleContext();
  const { isDark } =
    useTemplateThemeModeContext() as TemplateThemeModeContextType;

  let name = "";
  const user = getUserFromToken();
  name = user?.name;

  useEffect(() => {
    console.log(userInfo);
    if (userInfo?.avatar) {
      setAvatar(userInfo?.avatar);
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(UserProfile());
  }, []);

  return (
    <Container maxWidth="xl">
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
<Typography
  variant="h5"
  color={
    isDark ? theme.palette.success.dark : theme.palette.success.light
  }
  noWrap
  sx={{
    mr: 2,
    display: { xs: "none", md: "flex" },
    '& a:hover': {
      color: 'red',
    },
  }}
>
  <Link to="/" key={menuTitle} style={{ textDecoration: 'none', color: 'inherit' }}>
    {menuTitle}
  </Link>
</Typography>
          {broken && (
            <IconButton
              onClick={toggle}
              sx={{
                color: isDark
                  ? theme.palette.success.dark
                  : theme.palette.success.light,
                mt: "8px",
              }}
            >
              <Menu />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* <Box sx={{display:'flex', justifyContent:'flex-end'}}>
              <Search sx={{m:'auto', 
              color:isDark ? theme.palette.success.dark : theme.palette.success.light, 
              width:30, height:30}} />
            </Box> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              py: 0,
              my: 0,
            }}
          >
            {/* <Divider orientation="vertical" flexItem sx={{py:0, my:0}}/> */}
            <Select
              id="navbarSelect"
              sx={{
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&:focus": {
                  outline: "none",
                },
                outline: 0,
                maxHeight: "100%",
                px: 0.5,
                py: 0,
                my: 0,
                border: 0
              }}
              displayEmpty
              renderValue={(value) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                      py: 0,
                      my: 0,
                    }}
                  >
                    <>
                      <Typography
                        mx="auto"
                        py={0}
                        variant="h6"
                        color={
                          isDark
                            ? theme.palette.success.dark
                            : theme.palette.success.light
                        }
                      >
                        {name}
                      </Typography>
                      <Avatar
                        sx={{ width: 35, height: 35, m: 0, p: 0 }}
                        src={`${baseURL}images/${avatar}`}
                        alt="avatar"
                      />
                      {value}
                    </>
                  </Box>
                );
              }}
            >
              <MenuItem>私のプロフィール</MenuItem>
              <MenuItem
                onClick={() => {
                  removeCookie("token");
                  removeCookie1("usertoken");
                  return dispatch(logout(navigate));
                }}
              >
                ログアウト
              </MenuItem>
            </Select>
          </Box>
        </Box>
      </Toolbar>
    </Container>
  );
};

export default Navbar;

// {/* <ConsoleLog title={'navbarSelect height'} message={document.getElementById("navbarSelect")?.clientHeight.toString()}/> */}

//   {/* <Menu
//     id="menu-appbar"
//     anchorEl={anchorElNav}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "left",
//     }}
//     keepMounted
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "left",
//     }}
//     open={Boolean(anchorElNav)}
//     onClose={toggle}
//     sx={{
//       display: { xs: "block", md: "none" },
//     }}
//   >
//     {routes.map((page) => (
//       <Link
//         key={page.key}
//         component={NavLink}
//         to={page.path}
//         color="black"
//         underline="none"
//         variant="button"
//       >
//         <MenuItem onClick={toggle}>
//           <Typography textAlign="center">{page.title}</Typography>
//         </MenuItem>
//       </Link>
//     ))}
//   </Menu>
// </Box>*/}
// {/*<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//    <Box
//     sx={{
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "flex-start",
//       alignItems: "center",
//       marginLeft: "1rem",
//     }}
//   >
//     {routes.map((page) => (
//       <Link
//         key={page.key}
//         component={NavLink}
//         to={page.path}
//         color="black"
//         underline="none"
//         variant="button"
//         sx={{ fontSize: "large", marginLeft: "2rem" }}
//       >
//         {page.title}
//       </Link>
//     ))}
//   </Box>
// </Box>*/}
