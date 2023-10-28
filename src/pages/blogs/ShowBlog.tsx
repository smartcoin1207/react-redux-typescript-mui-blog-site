import { useEffect, useState, ReactElement, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { RootState } from "../../redux/store/store";
import {
  GetBlog, setCurrentPage,
} from "../../redux/actionCreators/blogActions";
import { useParams } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";
import { Padding } from "@mui/icons-material";

const ShowBlog: FC = (): ReactElement => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const blog = useSelector((state: RootState) => state.blog.current_blog);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetBlog(navigate, id));
  }, []);

  
  useEffect(() => {
    dispatch(setCurrentPage('genre'));
  }, [])

  return (
    <Box
      sx={{
        width: {xs: '100%', ms: '90%', md: '90%', lg: '80%'},
        padding: 4,
      }}
    >
      <Card
        sx={{
          marginTop: "20px",
          border: "solid 1px #2196f3",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6">
              <Typography variant="h6" sx={{ color: "red", float: "left" }}>
                ブログのタイトル:
              </Typography>
              <Typography
                variant="h5"
                sx={{ pl: 2, color: "#2196f3", float: "left" }}
              >
                {` ${blog?.title}`}
              </Typography>
            </Typography>
          }
          sx={{ fontSize: "16px", padding: '14px' }}
        />
        <Divider sx={{ border: "1px dotted #2196f3" }} />

        <CardContent>
          <Box>
            <div>{blog?.content}</div>  
          </Box>
        </CardContent>
      </Card>
      {(user?.role_id == '1' ||
                (user?.role_id == '2')) && (
                  <Box sx={{mt: 4}}>
                  <Button variant="outlined" sx={{float: 'right'}} color="success" onClick={() => navigate(`/blog/edit/${id}`)}>編集</Button>
            
                  </Box>
                )}

    </Box>
  );
};

export default ShowBlog;
