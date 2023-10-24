import { useEffect, useState, ReactElement, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

interface IUser {
  name: string;
  user_id?: string | null;
  role_id: string;
}

const CreateBlog: FC = (): ReactElement => {
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
    dispatch(getAllGenres());
  }, []);

  useEffect(() => {
    if (allGenres) {
      if (auth_user) {
        let steps: any = [];
        allGenres.forEach((group: any) => {
          if (group.id == auth_user.group_id) {
            // alert(group.id)
            steps = group.categories;
            return;
          }
        });
        setCategories(steps);
        console.log(steps);
      }
    }
  }, [allGenres]);

  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    const node: number = parseInt(nodeId);

    if (node) {
      setSelectedGenre(nodeId);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();


    if(!selectedGenre) {
      toast.error("ジャンルを選択", {
        autoClose: 1000 ,
      });
    } else{
      const newBlog = {
        genre_id: selectedGenre,
        title: title,
        content: content,
      };
  
      dispatch(AddBlog(navigate, newBlog));
    }


  };

  return (
    <Box
      sx={{
        width: "100%",
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

      <Card
        sx={{
          marginTop: "20px",
          border: "solid 1px #2196f3",
        }}
      >
        <CardHeader title="ジャンルを選択" sx={{ fontSize: "16px" }} />
        <Divider sx={{ border: "1px dotted #2196f3" }} />

        <CardContent>
          <TreeView
            aria-label="controlled"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect={handleSelect}
          >
            {role == 1 &&
              allGenres?.map((group: any, index: number) => (
                <TreeItem
                  nodeId={"group" + group.id}
                  sx={{ color: "#2e7d32" }}
                  label={group.name + "(" + group.count + ")"}
                >
                  {group.categories?.map((category: any, index1: number) => (
                    <TreeItem
                      nodeId={"category" + category.id}
                      sx={{ ml: 4, color: "#2979ff" }}
                      label={category.name + "(" + category.count + ")"}
                    >
                      {category.genres?.map((genre: any, index2: number) => (
                        <TreeItem
                          nodeId={genre.id}
                          sx={{ ml: 4, color: "black" }}
                          label={genre.name + "(" + genre.count + ")"}
                        />
                      ))}
                    </TreeItem>
                  ))}
                </TreeItem>
              ))}
            {role == 2 &&
              categories?.map((category: any, index1: number) => (
                <TreeItem
                  nodeId={"category" + category.id}
                  sx={{ ml: 4, color: "#2979ff" }}
                  label={category.name}
                >
                  {category.genres?.map((genre: any, index2: number) => (
                    <TreeItem
                      nodeId={genre.id}
                      sx={{ ml: 4, color: "black" }}
                      label={genre.name}
                    />
                  ))}
                </TreeItem>
              ))}
          </TreeView>
        </CardContent>
      </Card>

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
