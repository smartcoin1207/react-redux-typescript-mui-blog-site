import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Avatar } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteUserAction, GetUsers } from "../../redux/actionCreators/userActions";
import { RootState } from "../../redux/store/store";
import { ThemeColor } from "../../styles/GlobalStyle";
import { baseURL, serverUrl } from "../../services/axios";



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

const UserList: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(GetUsers(navigate));
  }, []);

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

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">画像</StyledTableCell>
              <StyledTableCell  align="center">ユーザーID</StyledTableCell>
              <StyledTableCell align="center">名前</StyledTableCell>
              <StyledTableCell align="center">ふりがな</StyledTableCell>
              <StyledTableCell align="center">
                メールアドレス
              </StyledTableCell>
              <StyledTableCell align="center">アカウント種別</StyledTableCell>
              <StyledTableCell align="center">グループ</StyledTableCell>
              <StyledTableCell align="center">編集</StyledTableCell>
              <StyledTableCell align="center">削除</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.map((user: any) => (
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
                  <Button onClick={() => navigate("/user/edit/" + user.id, { replace: true })} variant="outlined" color="success">
                    編集
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => {if(user.role_id != 2) { return dispatch(DeleteUserAction(user.id, navigate)) } } } variant="outlined" color="error">
                    削除
                  </Button>
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
