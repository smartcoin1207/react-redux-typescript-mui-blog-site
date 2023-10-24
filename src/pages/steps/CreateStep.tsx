import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  ReactElement,
  FC,
} from "react";
import { useCookies } from "react-cookie";

import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Stack,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Grid,
  Avatar,
  IconButton,
  SelectChangeEvent,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  OutlinedInput,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AddStep, getAllGroups } from "../../redux/actionCreators/userActions";
import { RootState } from "../../redux/store/store";
  import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ThemeColor } from "../../styles/GlobalStyle";

interface IUser {
  name: string;
  user_id?: string | null;
  role_id: string;
}

const CreateStep: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["usertoken"]);
  const usertoken = cookies.usertoken;
  const dispatch = useDispatch();
  const allGroups = useSelector((state: RootState) => state.users.groups);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [step, setStep] = useState("");
  const [groups, setGroups] = useState<any[]>([]);

  let role: number = 0;

  if (usertoken) {
    const user: IUser = jwt_decode(usertoken);
    role = user ? parseInt(user.role_id, 10) : 4;
  }

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  const handleGroupChange = (event: SelectChangeEvent) => {
    setSelectedGroup(event.target.value as string);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const newStep = {
      group_id: selectedGroup,
      name: step,
    };

    dispatch(AddStep(navigate, newStep));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ width: "80%", mt: 4 }}>
      {/* <Card
        sx={{
          // mt: 1,
          border: "solid 2px #2196f3",
          width: "100%",
          // height: "100%",

        }}
      > */}
      {/* <CardHeader
          title="ユーザー登録"
          sx={{
            justifyContent: "center",
            color: "white",
            backgroundColor: "#2196f3",
          }}
        /> */}

      {/* <Divider sx={{ border: "1px dotted #2196f3" }} /> */}
      {/* <CardContent> */}

      <Typography sx={{fontSize: '2rem', mt: 4, mb:4,  color: ThemeColor.main, fontWeight: '600'}} variant="h4">ステップを作成する</Typography>
      <Divider orientation="horizontal" />

      <form onSubmit={handleSubmit}>
        <Stack sx={{mt:4}}>
          <Grid container spacing={2} columns={16}>
            {role == 1 && (
              <Grid item xs={16} md={6}>
                {/* <Item> */}
                <InputLabel id="demo-simple-select-label" sx={{ mb: 2 }}>
                  グループを選択
                </InputLabel>
                <Select
                  labelId="group-select-label"
                  id="group-select"
                  value={selectedGroup}
                  // label="グループを選択"
                  onChange={handleGroupChange}
                  fullWidth
                  required
                >
                  {allGroups?.map((group: any) => {
                    return (
                      <MenuItem key={group.id + "group"} value={group.id}>
                        {group.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {/* </Item> */}
              </Grid>
            )}

            <Grid item xs={16} md={role == 1 ? 10 : 16}>
              {/* <Item> */}
              <InputLabel id="demo-simple-select-label" sx={{ mb: 2 }}>
                ステップ名
              </InputLabel>
              <OutlinedInput
                type="text"
                color="primary"
                onChange={(e) => setStep(e.target.value)}
                value={step}
                required
                fullWidth
                // sx={{ mt: 4 }}
              />
              {/* </Item> */}
            </Grid>
          </Grid>
        </Stack>

        <Button
          variant="outlined"
          color="primary"
          type="submit"
          size="large"
          sx={{ textAlign: "right", mt: 4, float: "right", height: 50 }}
        >
          作成する
        </Button>
      </form>
      {/* </CardContent> */}
      {/* </Card> */}
    </Box>
  );
};

export default CreateStep;
