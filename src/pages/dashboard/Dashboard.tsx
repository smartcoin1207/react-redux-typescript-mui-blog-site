import { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Paper from "@mui/material/Paper";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "dayjs/locale/ja";

import { styled } from "@mui/material/styles"; //useTheme
import {
  Box,
  TextField,
  Typography,
  Stack,
  Divider,
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import { Padding } from "@mui/icons-material";
import { ThemeColor, theme } from "../../styles/GlobalStyle";
import {
  GetNewBlogs,
  GetSearchResult,
  getAllGroups,
} from "../../redux/actionCreators/userActions";
import { getAllCategories, setCurrentPage } from "../../redux/actionCreators/blogActions";
import { group } from "console";
import { forEach, initial, random, values } from "lodash";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode !== "dark" ? "whitesmoke" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MapContainer = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: 37.7749, // Latitude of the map center
    lng: -122.4194, // Longitude of the map center
  };

  return (
    <Box>
      <LoadScript googleMapsApiKey="">
        <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={center}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

interface ChildComponentProps {
  id: string;
  title: string;
  time: number;
}

interface GroupTitleComponentProps {
  id: string;
  title: string;
  isSuper: boolean;
  allowed: any[] | null;
}

const BlogTitleItem: FC<ChildComponentProps> = ({ id, title, time }) => {
  // alert(time)

  const inputDateString = time;
  const inputDate = new Date(inputDateString);
  const formattedDate = inputDate.toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <>
      <ListItem  button sx={{ padding: 0, margin: 0 }}>
        <Link to={`/blog/show/${id}`} style={{ textDecoration: "none", width: '100%' }}>
          <Typography sx={{ fontSize: "1.3rem" }}>{title}</Typography>

          <Typography sx={{ mr: 2, color: "grey" }}>{formattedDate}</Typography>
        </Link>
      </ListItem>
      <Divider sx={{ mt: 1, mb: 1 }} />
    </>
  );
};

const GroupNameItem: FC<GroupTitleComponentProps> = ({
  id,
  title,
  isSuper,
  allowed,
}) => {
  let allow = false;
  if (isSuper || allowed?.includes(`${id}`)) {
    allow = true;
  }
  return (
    <>
      <>
        {allow ? (
          <Link
            to={allow ? `/step/steps/${id}` : ""}
            style={{ textDecoration: "none" }}
          >
            <Typography sx={{ fontSize: "1.3rem" }}>{title}</Typography>
          </Link>
        ) : (
          <Typography sx={{ fontSize: "1.3rem", color: "grey" }}>
            {title}
          </Typography>
        )}
      </>
      <Divider sx={{ mt: 1, mb: 1 }} />
    </>
  );
};

const Dashboard: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user: any | null | undefined = useSelector(
    (state: RootState) => state.auth.user
  );
  const groups: any = useSelector((state: RootState) => state.blog.all_groups);

  // const all_categories: any = useSelector((state: RootState) => state.blog.all_categories);

  const new_blogs: any = useSelector(
    (state: RootState) => state.users.new_blogs
  );
  const searchBlogs: any = useSelector(
    (state: RootState) => state.users.search_blogs
  );

  const [viewGroups, setViewGroups] = useState<any[]>([]);
  const [viewGroupIds, setViewGroupIds] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [ninetieth_life, setNinetieth_life] = useState(0);
  const [work_life, setWork_life] = useState(0);
  const [die_life, setDie_life] = useState(0);
  const [healthy_life, setHealthy_life] = useState(0);
  const [average_life, setAverage_life] = useState(0);


  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    dispatch(setCurrentPage(''));
  } ,[])

  useEffect(() => {
    dispatch(GetNewBlogs());
  }, []);

  useEffect(() => {
    setName(user?.name);
    if(user) {
      const currentDate = dayjs();
      const birthDate = dayjs(user.birthday);
      const currentAge = currentDate.diff(birthDate, "year");

      setNinetieth_life(parseInt(user.ninetieth_life) - currentAge);
      setWork_life(parseInt(user.work_life) - currentAge);
      setDie_life(parseInt(user.die_life) - currentAge);
      setHealthy_life(parseInt(user.healthy_life) - currentAge);
      setAverage_life(parseInt(user.average_life) - currentAge);
    }
    
  }, [user]);

  useEffect(() => {
    console.log(groups);

    if (user) {
      const allowed_categories = JSON.parse(user?.allowed_categories);
      console.log(allowed_categories);

      if (user.role_id == "1") {
        setViewGroups(groups);
      } else {
        let temp: any = [];
        if (user.role_id == "2") {
          temp.push("1");
          temp.push(user?.group_id);
        }

        Object.entries(allowed_categories).forEach(([key, value]) => {
          temp.push(key);
        });
        setViewGroupIds(temp);
        console.log(temp);
        let temp_groups: any[] = [];
        groups?.forEach((group: any) => {
          if (temp.includes(`${group?.id}`)) {
            temp_groups.push(group);
          }
        });
        setViewGroups(temp_groups);
      }
    }
  }, [groups]);
  // const theme = useTheme();  // sx={{[theme.breakpoints.down('sm')]: {display:'flex', flexDirection:'column', justifyContent:'center'}}}

  const onSearch = () => {
    if (searchTitle != "" || searchContent != "") {
      const search = {
        title: searchTitle,
        content: searchContent,
      };
      dispatch(GetSearchResult(search));
    } else {
      toast.error("正しい検索フィールド", {
        autoClose: 1000,
      });
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", ms: "80%", md: "80%", lg: "80%" },
        padding: "10px",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", my: "1rem" }}
        variant="h4"
      >
        ようこそ{"   "}
        <div style={{ color: ThemeColor.main, display: "inline-block" }}>
          {name} さん
        </div>
        ID: {user?.user_id}
      </Typography>
      <Divider orientation="horizontal" />

      <Box sx={{ pl: 2 }}>
        <Typography
          sx={{
            color: ThemeColor.main,
            paddingTop: "20px",   
            mb: 2,
            textAlign: "left",
            fontSize: "1.5rem",
          }}
          variant="h5"
        >
          あなたが閲覧できるグループは
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={3}
        >
          {viewGroups?.map((group: any) => (
            <Typography sx={{fontSize: '1.2rem'}}>
              {" "}
              <Link to={`/step/steps/${group?.id}`} style={{textDecoration: 'none', color: 'initial'}}>{group?.name}</Link>
            </Typography>
          ))}
        </Stack>
      </Box>

      <Box>
        <Card
          sx={{
            mb: 4,
            mt: 4,
            // border: "solid 1px #2196f3",
          }}
        >
          <CardHeader
            title="あなたに残された人生は後"
            sx={{ color: ThemeColor.main }}
          />
          <Divider orientation="horizontal" />

          <CardContent>
            {/* <FormControl> */}
            <List>
              <ListItem  sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 人生の9割が確定(30歳)まで" />

                <Typography variant="h6" sx={{ pl: 1 }}>
                  {ninetieth_life} 年
                </Typography>
              </ListItem>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <ListItem sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 労働寿命まで後" />
                <Typography variant="h6" sx={{ pl: 1 }}>
                  {work_life} 年
                </Typography>
              </ListItem>

              <Divider sx={{ mt: 1, mb: 1 }} />
              <ListItem sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 死んでいるかもしれない日まで " />

                <Typography variant="h6" sx={{ pl: 1 }}>
                  {die_life} 年
                </Typography>
              </ListItem>

              <Divider sx={{ mt: 1, mb: 1 }} />
              <ListItem sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 健康寿命まで後" />

                <Typography variant="h6" sx={{ pl: 1 }}>
                  {healthy_life} 年
                </Typography>
              </ListItem>

              <Divider sx={{ mt: 1, mb: 1 }} />
              <ListItem sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 平均寿命まで後 " />

                <Typography variant="h6" sx={{ pl: 1 }}>
                  {average_life} 年
                </Typography>
              </ListItem>
              <Divider sx={{ mt: 1, mb: 1 }} />
            </List>

            {/* </FormControl> */}
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Grid container columnSpacing={1}>
          <Grid item xs={10}>
            <TextField
              id="title-search"
              label="タイトル検索"
              type="search"
              size="small"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              sx={{
                borderRadius: "15px",
                padding: "10px",
                width: {
                  md: "50%",
                  xs: "100%",
                  "& .MuiInputLabel-root": {
                    top: "10%",
                  },
                },
              }}
              variant="outlined"
            />
            <TextField
              id="content-search"
              label="本文検索"
              type="search"
              size="small"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              sx={{
                borderRadius: "15px",
                padding: "10px",
                width: { md: "50%", xs: "100%" },
                "& .MuiInputLabel-root": {
                  top: "10%",
                },
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} sx={{ margin: "auto" }}>
            <Button
              variant="contained"
              size="small"
              onClick={onSearch}
              sx={{
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                // padding: "15px",
                margin: "auto",
                fontSize: "1.5rem",
              }}
            >
              検索
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <List>
        {searchBlogs?.map((blog: any) => (
          <BlogTitleItem
            title={blog?.title}
            id={blog?.id}
            time={blog?.created_at}
          />
        ))}
        </List>

      </Box>
      <Box>
        <Card sx={{ marginTop: "20px" }}>
          <CardHeader
            title="新着記事一覧"
            // sx={{ backgroundColor: ThemeColor.main, color: "white" }}
            sx={{ color: ThemeColor.main }}
          />
          <Divider />
          <CardContent>
            {new_blogs?.map((blog: any) => (
              <BlogTitleItem
                title={blog.title}
                id={blog.id}
                time={blog.created_at}
              />
            ))}
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h5" sx={{ color: ThemeColor.main, mt: 8, mb: 2 }}>
          サイト内のすべてのグループ
        </Typography>
        <Divider />
        {groups?.map((group: any) => (
          <GroupNameItem
            title={group.name}
            id={group.id}
            isSuper={user?.role_id == 1}
            allowed={viewGroupIds}
          />
        ))}
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        <Typography variant="h5" sx={{ color: ThemeColor.main, mt: 8, mb: 2 }}>
          Googleマップ
        </Typography>
        {/* <MapContainer /> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
