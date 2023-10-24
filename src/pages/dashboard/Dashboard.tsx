import { FC, ReactElement, useEffect, useState } from "react";
import { styled } from "@mui/material/styles"; //useTheme
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { UserProfile } from "../../redux/actionCreators/authActions";
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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { Padding } from "@mui/icons-material";
import { ThemeColor, theme } from "../../styles/GlobalStyle";

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

  const [profile, setProfile] = useState({});

  const [name, setName] = useState("");
  const [user_id, setId] = useState("");
  const [ninetieth_life, setNinetieth_life] = useState("");
  const [work_life, setWork_life] = useState("");
  const [die_life, setDie_life] = useState("");
  const [healthy_life, setHealthy_life] = useState("");
  const [average_life, setAverage_life] = useState("");

  useEffect(() => {
    // const ss = user?.name
    setName(user?.name);
  }, [user]);

  // const theme = useTheme();  // sx={{[theme.breakpoints.down('sm')]: {display:'flex', flexDirection:'column', justifyContent:'center'}}}

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
          <>Aグループ</>
          <>Bグループ</>
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
          <Divider orientation="horizontal"/>

          <CardContent>
            {/* <FormControl> */}
            <List>
              <ListItem sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 人生の9割が確定(30歳)まで" />

                <Typography variant="h6" sx={{ pl: 1 }}>
                  {user?.ninetieth_life} 年
                </Typography>
              </ListItem>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <ListItem sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 労働寿命まで後" />
                <Typography variant="h6" sx={{ pl: 1 }}>
                  {user?.work_life} 年
                </Typography>
              </ListItem>

              <Divider sx={{ mt: 1, mb: 1 }} />
              <ListItem sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 死んでいるかもしれない日まで " />

                <Typography variant="h6" sx={{ pl: 1 }}>
                  {user?.die_life} 年
                </Typography>
              </ListItem>

              <Divider sx={{ mt: 1, mb: 1 }} />
              <ListItem sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 健康寿命まで後" />

                <Typography variant="h6" sx={{ pl: 1 }}>
                  {user?.healthy_life} 年
                </Typography>
              </ListItem>

              <Divider sx={{ mt: 1, mb: 1 }} />
              <ListItem sx={{ padding: 0, margin: 0 }}>
                <ListItemText primary="• 平均寿命まで後 " />

                <Typography variant="h6" sx={{ pl: 1 }}>
                  {user?.average_life} 年
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
      <Box>
        <Card sx={{ marginTop: "20px" }}>
          <CardHeader
            title="新着記事一覧"
            // sx={{ backgroundColor: ThemeColor.main, color: "white" }}
            sx={{ color: ThemeColor.main }}
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
