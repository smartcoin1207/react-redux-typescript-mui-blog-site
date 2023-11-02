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
  DeleteGenre,
  EditGenre,
  getCurrentCategory,
  AddGenre,
  setCurrentPage
} from "../../redux/actionCreators/blogActions";
import { ThemeColor } from "../../styles/GlobalStyle";
import { Category } from "@mui/icons-material";
import { current } from "@reduxjs/toolkit";
import { da } from "date-fns/locale";

const GenreList: FC = (): ReactElement => {
  const { category_id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const current_category = useSelector(
    (state: RootState) => state.blog.current_category
  );
  const user: any | null | undefined = useSelector(
    (state: RootState) => state.auth.user
  );

  const [allGenres, setAllGenres] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);

  const [open, setOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  const [modalDataId, setModalDataId] = useState("");
  const [modalData, setModalData] = useState("");

  useEffect(() => {
    dispatch(getCurrentCategory(category_id));
  }, []);

  useEffect(() => {
    dispatch(setCurrentPage('group'));
  }, [])

  useEffect(() => {
    if (current_category) {
      setCategory(null);
      setAllGenres([]);
    }
    if (current_category && user) {
      setCategory(current_category);
      setAllGenres(current_category?.genres);
    }
  }, [current_category]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (id: any, name: any) => {
    setModalData(name);
    setModalDataId(id);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenDelete = (id: any, name: any) => {
    setModalData(name);
    setModalDataId(id);
    setOpenDelete(true);
  };


  const handleCreate = (step: any) => {
    const newStep = {
      category_id: category.id,
      name: step,
    };
    setOpen(false);
    dispatch(AddGenre(navigate, newStep));
  };

  const handleUpdate = (step: any) => {
    const newStep = {
      category_id: category.id,
      name: step,
    };
    setOpenEdit(false);

    dispatch(EditGenre(navigate, newStep, modalDataId));
  };


  const handleStepDelete = () => {
    // const newStep = {
    //   group_id: group.id
    // };
    setOpenDelete(false);
    // console.log(newStep)

    dispatch(DeleteGenre( modalDataId));
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
      <CreateGenreModal
        open={open}
        handleClose={handleClose}
        handleCreate={handleCreate}
      />
      <EditGenreModal
        open={openEdit}
        handleClose={handleCloseEdit}
        handleUpdate={handleUpdate}
        data={modalData}
      />

      {openDelete && (
        <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"指定したジャンルを削除できます"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          { modalData + "を本当に削除しますか？ このジャンルに属するすべてのブログがすべて消去されます。"}
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
            variant="h5"
          >
          ジャンルリスト
          </Typography>
          {/* <Divider orientation="horizontal" /> */}

          <Box sx={{ mt: 4 }}>
            {/* <Typography
              sx={{
                color: ThemeColor.main,
                paddingTop: "20px",
                mb: 2,
                textAlign: "left",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
              variant="h5"
            >
              {"あなたが" +
                category?.name +
                "グループ内で、 閲覧できるカテゴ リは"}
            </Typography> */}

          </Box>

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
                {category?.name} <Box sx={{ml:1, display:'inline-block'}}> {"( " + category?.blog_count + " )"} </Box>
              </Typography>
              {(user?.role_id == 1 ||
                (user?.role_id == 2 && user?.group_id == category?.group_id)) && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOpen}
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
                {allGenres?.map((genre: any) => (
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
                      to={`/blog/blogs/${genre?.id}`}
                      style={{ textDecoration: "none", color: "initial", width: '100%' }}
                    >
                      <Typography
                        sx={{
                          textAlign: "left",
                          fontSize: "1.2rem",
                        }}
                      >
                        {genre?.name}{" "}
                        <Box sx={{ display: "inline", pl: 1 }}>
                          {"( " + genre?.blog_count + " )"}
                        </Box>
                      </Typography>
                    </Link>
                    {(user?.role_id == 1 ||
                      (user?.role_id == 2 && user?.group_id == category?.group_id)) && (
                      <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Button
                          variant="outlined"
                          color="success"
                          size="small"
                          onClick={() =>
                            handleOpenEdit(genre?.id, genre?.name)
                          }
                          sx={{
                            float: "right",
                            mr: 2,
                          }}
                        >
                          編集
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() =>
                            handleOpenDelete(genre?.id, genre?.name)
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

export default GenreList;

interface CreateGenreModalProps {
  open: boolean;
  handleClose: () => void;
  handleCreate: (step: any) => void;
}

const CreateGenreModal: FC<CreateGenreModalProps> = ({
  open,
  handleClose,
  handleCreate,
}) => {
  const [step, setStep] = useState("");

  useEffect(() => {
    setStep("");
  }, [open]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    handleCreate(step);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ borderRadius: "15px" }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2 }}
            >
              ジャンル名
            </Typography>

            <OutlinedInput
              type="text"
              color="primary"
              onChange={(e) => setStep(e.target.value)}
              value={step}
              required
              fullWidth
              // sx={{ mt: 4 }}
            />

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              size="large"
              sx={{ textAlign: "right", mt: 4, float: "right", height: 50 }}
            >
              作成する
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

interface EditGenreModalProps {
  open: boolean;
  handleClose: () => void;
  handleUpdate: (step: any) => void;
  data: string;
}

const EditGenreModal: FC<EditGenreModalProps> = ({
  open,
  handleClose,
  handleUpdate,
  data,
}) => {
  const [step, setStep] = useState("");

  useEffect(() => {
    setStep(data);
  }, [open]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    handleUpdate(step);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ borderRadius: "15px" }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2 }}
            >
              ジャンル名を変更します。
            </Typography>

            <OutlinedInput
              type="text"
              color="primary"
              onChange={(e) => setStep(e.target.value)}
              value={step}
              required
              fullWidth
              // sx={{ mt: 4 }}
            />

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              size="large"
              sx={{ textAlign: "right", mt: 4, float: "right", height: 50 }}
            >
              保存
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};
