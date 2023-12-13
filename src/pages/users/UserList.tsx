import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  Avatar,
  OutlinedInput,
  outlinedInputClasses,
  Divider,
  Modal,
} from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, CardMedia } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

import {
  ChangeUserStatus,
  DeleteUserAction,
  GetUsers,
} from "../../redux/actionCreators/userActions";
import { RootState } from "../../redux/store/store";
import { ThemeColor } from "../../styles/GlobalStyle";
import { baseURL, serverUrl } from "../../services/axios";
import { relative } from "path";
import { Password, QrCode } from "@mui/icons-material";
import { ChangePassword } from "../../redux/actionCreators/userActions";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: ThemeColor.main800,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StatusSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const useStyles = styled("div")({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9 aspect ratio
  },
});

const UserList: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.users);
  const [userList, setUserList] = useState<any[]>([]);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalDataId, setModalDataId] = useState("");
  const [modalData, setModalData] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  useEffect(() => {
    dispatch(GetUsers(navigate));
  }, []);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const changeStatus = (id: any) => {
    let tmp: any[] = [];
    userList.forEach((user1: any) => {
      if (id == user1.id) {
        if (user1.status == "1") {
          user1.status = "2";
        } else {
          user1.status = "1";
        }
      }

      tmp.push(user1);
    });

    setUserList(tmp);
  };

  // const handleClick = (id:any) => {
  //   console.log(id);
  //   dispatch(ChangeUserStatus(navigate, id));
  //   changeStatus(id);

  // }

  const handleClick = (id: any) => {
    dispatch(ChangeUserStatus(navigate, id));

    const updatedUsers = userList.map((user) => {
      if (user.id === id) {
        return { ...user, status: user.status != "1" ? "1" : "2" };
      }
      return user;
    });
    setUserList(updatedUsers);
  };

  const handleOpenChangePassword = (id: any, name: any) => {
    setModalData(name);
    setModalDataId(id);
    setOpenChangePassword(true);
    setNewConfirmPassword("");
    setNewPassword("");
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const handleChangePassword = (newPassword: any, newConfirmPassword: any) => {

    setOpenChangePassword(false);

    if(newPassword == newConfirmPassword) {
      const n = {
        user_id: modalDataId,  newPassword: newPassword, 
      }
  
      dispatch(ChangePassword(n));
    } else {
        toast.error("新しいパスワードとパスワードの確認を正確に入力してください。", {
          autoClose: 1000,
        });
        return;
  
    }

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
    <Box sx={{ width: "90%" }}>
      <Typography
        sx={{
          fontSize: "2rem",
          mt: 4,
          mb: 4,
          color: ThemeColor.main,
          fontWeight: "600",
        }}
        variant="h4"
      >
        ユーザーリスト
      </Typography>

      <EditStepModal
        open={openChangePassword}
        handleClose={handleCloseChangePassword}
        handleUpdate={handleChangePassword}
        data={modalData}
      />

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">画像</StyledTableCell>
              <StyledTableCell align="center">ユーザーID</StyledTableCell>
              <StyledTableCell align="center">QRコード</StyledTableCell>
              <StyledTableCell align="center">名前</StyledTableCell>
              <StyledTableCell align="center">ふりがな</StyledTableCell>
              <StyledTableCell align="center">メールアドレス</StyledTableCell>
              <StyledTableCell align="center">アカウント種別</StyledTableCell>
              <StyledTableCell align="center">グループ</StyledTableCell>
              <StyledTableCell align="center">編集</StyledTableCell>
              <StyledTableCell align="center">パスワード変更</StyledTableCell>
              <StyledTableCell align="center">停止</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userList?.map((user: any) => (
              <StyledTableRow
                key={user.id}
                sx={{ backgroundColor: "#35485b2e" }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                      m: "auto",
                      p: 0,
                      justifyContent: "center",
                    }}
                    src={`${serverUrl}upload/images/${user.avatar}`}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{user.user_id}</StyledTableCell>
                <StyledTableCell align="center">
                  {(user.qr_codeurl == null || user.qr_codeurl == "") && <></>}
                  {user.qr_codeurl && (
                    <img
                      style={{ width: 100, height: 100 }}
                      src={`${serverUrl}upload/qrcodes/${user.qr_codeurl}`}
                      alt="QRコード"
                    />
                  )}
                </StyledTableCell>

                <StyledTableCell align="center" component="th" scope="row">
                  {user.name}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {user.read_name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.role_id == 2 ? "チームリーダー" : "ユーザー"}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {user.group?.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={() =>
                      navigate("/user/edit/" + user.id, { replace: true })
                    }
                    variant="outlined"
                    color="success"
                  >
                    編集
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={() => handleOpenChangePassword(user.id, user.name)}
                    variant="outlined"
                    color="success"
                  >
                    パスワード変更
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ position: "relative" }}>
                  {/* <Button onClick={() => {if(user.role_id != 2) { return dispatch(DeleteUserAction(user.id, navigate)) } } } variant="outlined" color="error">
                    削除
                  </Button>  */}
                  <FormControlLabel
                    sx={{ alignContent: "center" }}
                    control={
                      <StatusSwitch
                        defaultChecked
                        onClick={() => handleClick(user?.id)}
                      />
                    } // Add onClick event handler
                    label=""
                    checked={user?.status == "1" ? true : false}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;

interface EditStepModalProps {
  open: boolean;
  handleClose: () => void;
  handleUpdate: (newPassword: any, newConfirmPassword: any) => void;
  data: string;
}

const EditStepModal: FC<EditStepModalProps> = ({
  open,
  handleClose,
  handleUpdate,
  data,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  useEffect(() => {
    setNewPassword("");
    setNewConfirmPassword("");
  }, [open]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: '15px'
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    handleUpdate(newPassword, newConfirmPassword);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <Box sx={style}>

            <Typography
              sx={{
                fontSize: "1.7rem",
                mb: 4
              }}
            >
              {data + "のパスワード変更"}
            </Typography>

            <Box
            // sx={{width: { xs: "100%", ms: 400, md: 400, lg: 400 }}}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: 1, fontSize: "1rem" }}
              >
                新しいパスワード
              </Typography>

              <OutlinedInput
                type="text"
                color="primary"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
                fullWidth
                size="small"
                sx={{}}
              />

              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: 1, mt: 4, fontSize: "1rem" }}
              >
                新しいパスワードを確認
              </Typography>

              <OutlinedInput
                type="text"
                color="primary"
                onChange={(e) => setNewConfirmPassword(e.target.value)}
                value={newConfirmPassword}
                required
                fullWidth
                size="small"
                sx={{ width: "100%" }}
              />
            </Box>

            <Box sx={{ textAlign: "right", mt: 4 }}>
              <Button onClick={handleClose} color="success">
                キャンセル
              </Button>
              <Button onClick={handleSubmit} color="error">
                変更
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};
