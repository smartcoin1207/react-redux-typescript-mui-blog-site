import { useEffect, useState, ReactElement, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { RootState } from "../../redux/store/store";
import {
  AddBlog,
  getAllGenres,
  getAllGroups,
} from "../../redux/actionCreators/userActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import { getUserFromToken } from "../../util/util";
import { ThemeColor } from "../../styles/GlobalStyle";
import { GetBlog, UpdateBlog, setCurrentPage } from "../../redux/actionCreators/blogActions";

interface IUser {
  name: string;
  user_id?: string | null;
  role_id: string;
}

const EditBlog: FC = (): ReactElement => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const current_blog = useSelector((state: RootState) => state.blog.current_blog);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(GetBlog(navigate, id));
  }, [])

  useEffect(() => {
    dispatch(setCurrentPage('genre'));
  }, [])


  useEffect(() => {
    if(current_blog) {
      setTitle(current_blog?.title);
      setContent(current_blog?.content);
    }
  }, [current_blog]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
      const newBlog = {
        title: title,
        content: content,
      };
      dispatch(UpdateBlog(navigate, newBlog, id));
  };

  return (
    <Box
      sx={{
        width: {xs: '100%', ms: '90%', md: '90%', lg: '80%'},
        padding: 4,
      }}
    >
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
        ブログを編集する
      </Typography>
      <Divider orientation="horizontal" />

      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="記事のタイトル"
            onChange={(e) => setTitle(e.target.value)}
            style={{ borderRadius: "10px" }}
            value={title}
            fullWidth
            sx={{ mt: 4 }}
            required
          />

          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="記事の内容"
            onChange={(e) => setContent(e.target.value)}
            style={{ borderRadius: "10px" }}
            value={content}
            fullWidth
            multiline
            rows={12}
            sx={{ mt: 4 }}
            required
          />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            size="large"
            sx={{ textAlign: "right", mt: 4, float: "right", height: 50 }}
          >
            記事投稿
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditBlog;
