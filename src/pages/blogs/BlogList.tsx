import { useEffect, useState, ReactElement, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { RootState } from "../../redux/store/store";
import {
  AddBlog,
  GetBlogs,
  getAllGenres,
} from "../../redux/actionCreators/userActions";
import { Link } from "react-router-dom";

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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetUsers } from "../../redux/actionCreators/userActions";

const BlogList: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state: RootState) => state.users.genres);
  const blogs: any = useSelector((state: RootState) => state.users.blogs);

  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("");
  // const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    const node: number = parseInt(nodeId);

    if (node) {
      setSelectedGenre(nodeId);
      dispatch(GetBlogs(nodeId));
      console.log(nodeId);
    }
  };

  return (
    <Box sx={{width:{sx: '100%', ms: '90%', md:'90%', lg:'90%'}}} >
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
            {allGenres?.map((group: any, index: number) => (
              <TreeItem
                nodeId={"group" + group.id}
                sx={{ color: "#2e7d32" }}
                label={group.name + "(" + group.count + ")"}
              >
                {group.categories?.map((category: any, index1: number) => (
                  <TreeItem
                    nodeId={"category" + category.id}
                    sx={{ ml: 8, color: "#2979ff" }}
                    label={category.name + "(" + category.count + ")"}
                  >
                    {category.genres?.map((genre: any, index2: number) => (
                      <TreeItem
                        nodeId={genre.id}
                        sx={{ ml: 8, color: "black" }}
                        label={genre.name  + "(" + genre.count + ")"}
                      />
                    ))}
                  </TreeItem>
                ))}
              </TreeItem>
            ))}
          </TreeView>
        </CardContent>
      </Card>

      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Typography variant="h5" sx={{ paddingLeft: 2, mt: 4 }}>
          {" "}
          ブログリスト
        </Typography>
        <nav aria-label="main mailbox folders">
          <List>
            {blogs?.map((blog: any) => (
              <ListItem disablePadding>
                <Link to={`/blog/show/${blog?.id}`}>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>

                    <ListItemText primary={blog?.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </Box>
  );
};

export default BlogList;
