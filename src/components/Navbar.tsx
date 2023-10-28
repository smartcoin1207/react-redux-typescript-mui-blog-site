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
import { baseURL, serverUrl } from "../services/axios";
import { RootState } from "../redux/store/store";
import { useCookies } from "react-cookie";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IUser {
  name: string;
  user_id?: string | null;
  role_id?: string | null;
}

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const Navbar: FC = (): ReactElement => {
  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userInfo: any = useSelector((state: RootState) => state.auth.user);

  const current_group = useSelector(
    (state: RootState) => state.blog.current_group
  );
  const current_category = useSelector(
    (state: RootState) => state.blog.current_category
  );
  const current_genre = useSelector(
    (state: RootState) => state.blog.current_genre
  );
  const current_blog = useSelector(
    (state: RootState) => state.blog.current_blog
  );

  const current_page = useSelector(
    (state: RootState) => state.blog.current_page
  );

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [cookies1, setCookie1, removeCookie1] = useCookies(["usertoken"]);

  const [avatar, setAvatar] = useState("128.png");
  const [parentGroup, setParentGroup] = useState<any>(null);
  const [parentCategory, setParentCategory] = useState<any>(null);
  const [parentGenre, setParentGenre] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState("Accessories");
  const [showDropdown, setShowDropdown] = useState(false);

  const [showTopPage, setShowTopPage] = useState(false);
  const [showParentGroup, setShowParentGroup] = useState(false);
  const [showParentCategory, setShowParentCategory] = useState(false);
  const [showParentGenre, setShowParentGenre] = useState(false);

  const { broken } = useProSidebar();
  const { toggle } = useSidebar();
  const { menuTitle } = useSidebarSelectedMenuTitleContext();
  const { isDark } =
    useTemplateThemeModeContext() as TemplateThemeModeContextType;

  const name = user?.name;

  useEffect(() => {
    dispatch(UserProfile());
  }, []);

  useEffect(() => {
    console.log(userInfo);
    if (userInfo?.avatar) {
      setAvatar(userInfo?.avatar);
    }
  }, [userInfo]);

  useEffect(() => {
    if (current_category) {
      setParentGroup(current_category?.parent_group);
    } else {
      setParentGroup(null);
    }
  }, [current_category]);

  useEffect(() => {
    if (current_genre) {
      setParentGroup(current_genre?.parent_group);
      setParentCategory(current_genre?.parent_category);
      setParentGenre(current_genre);
    } else {
      setParentCategory(null);
    }
  }, [current_genre]);

  useEffect(() => {
    if (current_blog) {
      setParentGenre(current_blog?.genre);
      setParentCategory(current_blog?.genre.category);
      setParentGroup(current_blog?.genre.category.group);
    } else {
      setParentCategory(null);
    }
  }, [current_blog]);

  useEffect(() => {
    if(current_page == "") {
      setShowTopPage(false);
      setShowParentGroup(false);
      setShowParentCategory(false);
      setShowParentGenre(false);
    }
    if(current_page == "top") {
      setShowTopPage(true);
      setShowParentGroup(false);
      setShowParentCategory(false);
      setShowParentGenre(false);
    }
    if (current_page == "group") {
      setShowTopPage(true);
      setShowParentGroup(true);
      setShowParentCategory(false);
      setShowParentGenre(false);
    }
    if (current_page == "category") {
      setShowTopPage(true);
      setShowParentGroup(true);
      setShowParentCategory(true);
      setShowParentGenre(false);
    }
    if (current_page == "genre") {
      setShowTopPage(true);
      setShowParentGroup(true);
      setShowParentCategory(true);
      setShowParentGenre(true);
    }
  }, [current_page]);

  const handleDropClick = () => {
    setShowDropdown(!showDropdown);
  };

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
              "& a:hover": {
                color: "red",
              },
            }}
          >
            <Link
              to="/"
              key={menuTitle}
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">

            {showTopPage && (
              <StyledBreadcrumb
              component="a"
              href="#"
              label="トップページ"
              onClick={() => navigate("/")}
              icon={<HomeIcon fontSize="small" />}
            />
            )}


            {showParentGroup && (
              <StyledBreadcrumb
                component="a"
                href="#"
                label={parentGroup?.name}
                onClick={() => navigate(`/step/steps/${parentGroup?.id}`)}
              />
            )}

            {showParentCategory && (
              <StyledBreadcrumb
                component="a"
                href="#"
                label={parentCategory?.name}
                onClick={() => navigate(`/genre/genres/${parentCategory?.id}`)}
              />
            )}

            {showParentGenre && (
              <StyledBreadcrumb
                component="a"
                href="#"
                label={parentGenre?.name}
                onClick={() => navigate(`/blog/blogs/${parentGenre?.id}`)}
              />
            )}
          </Breadcrumbs>
        </div>
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
                border: 0,
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
                        src={`${serverUrl}upload/images/${avatar}`}
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
