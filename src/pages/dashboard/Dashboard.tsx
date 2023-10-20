import { FC, ReactElement, useEffect, useState } from "react";
import { styled } from "@mui/material/styles"; //useTheme
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { UserProfile } from "../../redux/actionCreators/userActions";
import { RootState } from "../../redux/store/store";
import { IUser } from "../../models/user";
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
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { Padding } from "@mui/icons-material";

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

const Dashboard: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user: any | null | undefined = useSelector(
    (state: RootState) => state.auth.user
  );
  // const new_blogs: any | null | undefined = useSelector(
  //   (state: RootState) => state.auth.new_blogs
  // );

  const [profile, setProfile] = useState({});

  const [name, setName] = useState("");
  const [user_id, setId] = useState("");
  const [ninetieth_life, setNinetieth_life] = useState("");
  const [work_life, setWork_life] = useState("");
  const [die_life, setDie_life] = useState("");
  const [healthy_life, setHealthy_life] = useState("");
  const [average_life, setAverage_life] = useState("");

  useEffect(() => {
    dispatch(UserProfile());
  }, [dispatch]);

  useEffect(() => {
    // const ss = user?.name
    setName(user?.name);
  }, [user]);

  // const theme = useTheme();  // sx={{[theme.breakpoints.down('sm')]: {display:'flex', flexDirection:'column', justifyContent:'center'}}}

  return (
    <Box sx={{ padding: "10px"}}>
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", my: "1rem" }}
        variant="h4"
      >
        <div style={{ color: "#2196f3", display: "inline-block" }}>
          ようこそ
        </div>{" "}
        {name} さん ID: {user?.user_id}
      </Typography>
      <Divider orientation="horizontal" />
      <Typography sx={{ paddingTop: "20px", textAlign: "left" }} variant="h5">
        ■あなたが閲覧できるグループは
      </Typography>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={3}
      >
        <>Aグループ</>
        <>Bグループ</>
      </Stack>
      <Box>
        <Card sx={{ marginTop: "20px" }}>
          <CardHeader
            title="あなたに残された人生は後"
            sx={{ backgroundColor: "#2196f3", color: "white" }}
          />
          <Divider />

          <CardContent>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              • 人生の9割が確定(30歳)まで {user?.ninetieth_life}年
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              • 労働寿命まで後 {user?.work_life}年
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              • 死んでいるかもしれない日まで {user?.die_life}年
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              • 健康寿命まで後 {user?.healthy_life}年
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              • 平均寿命まで後 {user?.average_life}年
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Grid container columnSpacing={1}>
          <Grid item xs={8}>
            <TextField
              id="title-search"
              label="タイトル検索"
              type="search"
              sx={{ borderRadius: "15px", padding: "10px" }}
              variant="outlined"
            />
            <TextField
              id="content-search"
              label="本文索"
              type="search"
              sx={{ borderRadius: "15px", padding: "10px" }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                padding: "15px",
              }}
            >
              検索
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Card sx={{ marginTop: "20px" }}>
          <CardHeader
            title="新着記事一覧"
            sx={{ backgroundColor: "#2196f3", color: "white" }}
          />
          <Divider />
          <CardContent>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              • 2023年9月19日 12:21 記事タイトル
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              • 2023年9月7日 15:10 記事タイトル{" "}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              •2023年8月8日 11:10 記事タイトル{" "}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              • 2023年7月17日 17:00 記事タイトル{" "}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "10px" }}>
              •2023年6月10日 23:21 記事タイトル{" "}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ marginTop: "30px" }}>{/* <MapContainer /> */}</Box>
    </Box>
  );
};

export default Dashboard;
