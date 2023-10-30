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
  DeleteStep,
  EditStep,
  getCurrentGroup,
  setCurrentPage,
} from "../../redux/actionCreators/blogActions";
import { ThemeColor } from "../../styles/GlobalStyle";
import { AddStep } from "../../redux/actionCreators/blogActions";
import { current } from "@reduxjs/toolkit";
import { Category } from "@mui/icons-material";

const StepList: FC = (): ReactElement => {
  const { group_id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const current_group = useSelector(
    (state: RootState) => state.blog.current_group
  );
  const user: any | null | undefined = useSelector(
    (state: RootState) => state.auth.user
  );

  const [viewCategories, setViewCategories] = useState<any[]>([]);
  const [viewCategoriesId, setViewCategoriesId] = useState<any[]>([]);

  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [group, setGroup] = useState<any>(null);

  const [open, setOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [modalDataId, setModalDataId] = useState("");
  const [modalData, setModalData] = useState("");

  useEffect(() => {
    dispatch(getCurrentGroup(group_id));
  }, []);

  useEffect(() => {
    dispatch(setCurrentPage("top"));
  }, []);

  useEffect(() => {
    if (current_group) {
      setViewCategories([]);
      setViewCategoriesId([]);
      setGroup(null);
      setAllCategories([]);
    }
    if (current_group && user) {
      setGroup(current_group);
      const allowed_categories = user
        ? JSON.parse(user.allowed_categories)
        : null;
      const categories = current_group.categories;
      setAllCategories(categories);

      if(user.role_id == 1 || (user.role_id == 2 && (current_group.id == user.group_id || current_group.id  == '1'))){
        setViewCategories(categories);
        let tmp: any[] = [];
        categories?.forEach((category: any) => {
          tmp.push(category.id);
        });
        setViewCategoriesId(tmp);
      } else {
        const allow = allowed_categories[`${group_id}`];
        if (allow) {
          let temp: any = [];
          let tmp  : any = [];

          categories?.forEach((category: any) => {
            if (allow.includes(`${category?.id}`)) {
              temp.push(category);
              tmp.push(category.id);
            } 
          });
          setViewCategories(temp);
          setViewCategoriesId(tmp)
        }
      }
    }
    console.log(current_group);
  }, [current_group]);

  const isCategoryOpen = (category: any) => {
    let isVisible = true;

    if(!viewCategoriesId.includes(category.id)) {
       isVisible = false;
    }
    if (category?.blog_count == "0") {
      isVisible = false;
    }
    if (
      user?.role_id == "1" ||
      (user?.role_id == "2" && group?.id == user?.group_id)
    ) {
      isVisible = true;
    }
    return isVisible;
  };

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
      group_id: group.id,
      name: step,
    };
    setOpen(false);
    dispatch(AddStep(navigate, newStep));
  };

  const handleUpdate = (step: any) => {
    const newStep = {
      group_id: group.id,
      name: step,
    };
    setOpenEdit(false);

    dispatch(EditStep(navigate, newStep, modalDataId));
  };

  const handleStepDelete = () => {
    // const newStep = {
    //   group_id: group.id
    // };
    setOpenDelete(false);
    // console.log(newStep)

    dispatch(DeleteStep(modalDataId));
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
      <CreateStepModal
        open={open}
        handleClose={handleClose}
        handleCreate={handleCreate}
      />
      <EditStepModal
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
          <DialogTitle>{"指定したステップを削除できます"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {modalData + "を本当に削除しますか？"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="success">
              同意しない
            </Button>
            <Button onClick={handleStepDelete} color="error">
              同意する
            </Button>
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

          <Box sx={{ mt: 4 }}>
            <Typography
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
                group?.name +
                "グループ内で、 閲覧できるカテゴ リは"}
            </Typography>

            <Box>
              {viewCategories?.map((category: any) => (
                <Typography
                  sx={{ ml: 2, fontSize: "1.2rem", display: "inline-block" }}
                >
                  {" "}
                  {/* <Link to={`/genre/genres/${category?.id}`} style={{textDecoration: 'none', color: 'initial'}}> */}
                  {"•  " + category?.name}
                  {/* </Link> */}
                </Typography>
              ))}
            </Box>
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
                カテゴリ分割
              </Typography>
              {(user?.role_id == 1 ||
                (user?.role_id == 2 && user?.group_id == group?.id)) && (
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
                {allCategories?.map((category: any) => (
                  <ListItem
                    button
                    sx={{
                      border: "1px #f1f3f4 solid",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {isCategoryOpen(category) ? (
                      <Link
                        to={`/genre/genres/${category?.id}`}
                        style={{ textDecoration: "none", color: "initial" }}
                      >
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontSize: "1.2rem",
                          }}
                        >
                          {category?.name}{" "}
                          <Box sx={{ display: "inline", pl: 1 }}>
                            {"( " + category?.blog_count + " )"}
                          </Box>
                        </Typography>
                      </Link>
                    ) : (
                      <Box>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontSize: "1.2rem",
                            color: 'grey'
                          }}
                        >
                          {category?.name}{" "}
                          <Box sx={{ display: "inline", pl: 1 }}>
                            {"( " + category?.blog_count + " )"}
                          </Box>
                        </Typography>
                      </Box>
                    )}

                    {(user?.role_id == 1 ||
                      (user?.role_id == 2 && user?.group_id == group?.id)) && (
                      <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Button
                          variant="outlined"
                          color="success"
                          size="small"
                          onClick={() =>
                            handleOpenEdit(category?.id, category?.name)
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
                            handleOpenDelete(category?.id, category?.name)
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

export default StepList;

interface CreateStepModalProps {
  open: boolean;
  handleClose: () => void;
  handleCreate: (step: any) => void;
}

const CreateStepModal: FC<CreateStepModalProps> = ({
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
              ステップ名
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

interface EditStepModalProps {
  open: boolean;
  handleClose: () => void;
  handleUpdate: (step: any) => void;
  data: string;
}

const EditStepModal: FC<EditStepModalProps> = ({
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
              ステップ名を変更します。
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
