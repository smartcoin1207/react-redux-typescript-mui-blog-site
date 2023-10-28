import { useEffect, useState, ReactElement, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { RootState } from "../../redux/store/store";
import {
  AddBlog, getCurrentGenre, setCurrentPage,
} from "../../redux/actionCreators/blogActions";

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

interface IUser {
  name: string;
  user_id?: string | null;
  role_id: string;
}

const CreateBlog: FC = (): ReactElement => {
  const {genre_id} = useParams();

  const dispatch = useDispatch();
  const allGenres = useSelector((state: RootState) => state.users.genres);
  const auth_user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const user = getUserFromToken();
  console.log(user);
  const role: number = user?.role_id;

  useEffect(() => {
    dispatch(getCurrentGenre(genre_id))
  }, [])

  
  useEffect(() => {
    dispatch(setCurrentPage('genre'));
  }, [])
  
  const handleSubmit = (event: any) => {
    event.preventDefault();

      const newBlog = {
        genre_id: genre_id,
        title: title,
        content: content,
      };
  
      dispatch(AddBlog(navigate, newBlog));
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
        ブログを作成する
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

export default CreateBlog;
