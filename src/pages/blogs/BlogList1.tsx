import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, FC } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Divider,
  Stack,
  Card,
  CardContent,
  ListItem,
  Modal,
  InputLabel,
  OutlinedInput,
  outlinedInputClasses,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/material/styles";
import { RootState } from "../../redux/store/store";
import {
  getCurrentGenre,
  DeleteBlog,
  setCurrentPage
} from "../../redux/actionCreators/blogActions";
import { ThemeColor } from "../../styles/GlobalStyle";
import { Category } from "@mui/icons-material";
import { current } from "@reduxjs/toolkit";
import { da } from "date-fns/locale";

const BlogList1: FC = (): ReactElement => {
  const { genre_id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const current_genre = useSelector(
    (state: RootState) => state.blog.current_genre
  );
  const user: any | null | undefined = useSelector(
    (state: RootState) => state.auth.user
  );

  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [genre, setGenre] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [modalDataId, setModalDataId] = useState("");
  const [modalData, setModalData] = useState("");

  useEffect(() => {
    dispatch(getCurrentGenre(genre_id));
  }, []);

  useEffect(() => {
    dispatch(setCurrentPage('category'));
  }, [])

  useEffect(() => {
    if (current_genre) {
      setGenre(null);
      setAllBlogs([]);
    }
    if (current_genre && user) {
      setGenre(current_genre);
      setAllBlogs(current_genre?.blogs);
    }
  }, [current_genre]);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenDelete = (id: any, title: any) => {
    setModalData(title);
    setModalDataId(id);
    setOpenDelete(true);
  };



  const handleStepDelete = () => {

    setOpenDelete(false);
    dispatch(DeleteBlog( modalDataId));
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        width: { xs: "100%", ms: "80%", md: "80%", lg: "70%" },
      }}
    >

      {openDelete && (
        <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"指定したブログを削除できます"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          { modalData + "を本当に削除しますか？"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="success">同意しない</Button>
          <Button onClick={handleStepDelete} color="error">同意する</Button>
        </DialogActions>
      </Dialog>
      )}

      <Card>
        <CardContent>
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold", my: "1rem" }}
            variant="h4"
          >
            ようこそ{"   "}
            <Box style={{ color: ThemeColor.main, display: "inline-block" }}>
              {user?.name} さん
            </Box>
            ID: {user?.user_id}
          </Typography>
          <Divider orientation="horizontal" />


          <Box sx={{ mt: 4, width: "100%" }}>
            <Box
              sx={{
                display: "inline-flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: ThemeColor.main,
                  // paddingTop: "20px",
                  mb: 2,
                  textAlign: "left",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                }}
                variant="h5"
              >
                {genre?.name} <Box sx={{ml:1, display:'inline-block'}}> {"( " + genre?.blog_count + " )"} </Box>
              </Typography>
              {(user?.role_id == 1 ||
                (user?.role_id == 2 && user?.group_id == genre?.group_id)) && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(`/blog/create/${genre?.id}`)}
                  sx={{
                    float: "right",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    mb: 2,
                  }}
                >
                  作成する
                </Button>
              )}
            </Box>

            <Card>
              <CardContent sx={{}}>
                {allBlogs?.map((blog: any) => (
                  <ListItem
                    button
                    sx={{
                      border: "1px #f1f3f4 solid",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link
                      to={`/blog/show/${blog?.id}`}
                      style={{ textDecoration: "none", color: "initial" }}
                    >
                      <Typography
                        sx={{
                          textAlign: "left",
                          fontSize: "1.2rem",
                        }}
                      >
                        {blog?.title}{" "}

                      </Typography>
                    </Link>
                    {(user?.role_id == 1 ||
                      (user?.role_id == 2 && user?.group_id == blog?.group_id)) && (
                      <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() =>
                            handleOpenDelete(blog?.id, blog?.title)
                          }
                          sx={{
                            float: "right",
                          }}
                        >
                          削除
                        </Button>
                      </Box>
                    )}
                  </ListItem>
                ))}
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BlogList1;

