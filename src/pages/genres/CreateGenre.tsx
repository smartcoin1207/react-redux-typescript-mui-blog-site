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

import {
  AddGenre,
  AddStep,
  getAllCategories,
  getAllGroups,
} from "../../redux/actionCreators/userActions";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ThemeColor } from "../../styles/GlobalStyle";

interface IUser {
  name: string;
  user_id?: string | null;
  role_id: string;
}

const CreateGenre: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["usertoken"]);
  const usertoken = cookies.usertoken;
  const dispatch = useDispatch();
  const allGroups = useSelector((state: RootState) => state.users.categories);

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState("");

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStep, setSelectedStep] = useState("");
  const [genre, setGenre] = useState("");
  const [groups, setGroups] = useState<any[]>([]);

  let role: number = 0;

  if (usertoken) {
    const user: IUser = jwt_decode(usertoken);
    role = user ? parseInt(user.role_id, 10) : 4;
  }

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    console.log(allGroups);
  }, [allGroups]);

  const handleGroupChange = (event: SelectChangeEvent) => {
    setSelectedGroupIndex(event.target.value as string);
    const group = allGroups[event.target.value];
    setSelectedGroup(group.id);
    setCategories(group.categories);
  };

  const handleStepChange = (event: SelectChangeEvent) => {
    setSelectedStep(event.target.value as string);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const newGenre = {
      group_id: selectedGroup,
      category_id: selectedStep,
      name: genre,
    };

    dispatch(AddGenre(navigate, newGenre));
  };

  return (
    <Box sx={{ width: "80%", mt: 4 }}>
            <Typography sx={{fontSize: '2rem', mt: 4, mb:4,  color: ThemeColor.main, fontWeight: '600'}} variant="h4">ジャンルを作成する</Typography>
      <Divider orientation="horizontal" />

      <form onSubmit={handleSubmit}>
        <Stack sx={{mt:4}}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16} md={8}>
              <InputLabel id="demo-simple-select-label" sx={{ mb: 2 }}>
                グループを選択
              </InputLabel>
              <Select
                labelId="group-select-label"
                id="group-select"
                value={selectedGroupIndex}
                onChange={handleGroupChange}
                fullWidth
                required
              >
                {allGroups?.map((group: any, index: number) => {
                  return (
                    <MenuItem key={group.id + "group"} value={index}>
                      {group.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={16} md={8}>
              <InputLabel id="demo-simple-select-label" sx={{ mb: 2 }}>
                ステップを選択
              </InputLabel>
              <Select
                labelId="group-select-label"
                id="group-select"
                value={selectedStep}
                onChange={handleStepChange}
                fullWidth
                required
              >
                {categories?.map((group: any) => {
                  return (
                    <MenuItem key={group.id + "group"} value={group.id}>
                      {group.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
        </Stack>
        <Grid item xs={16} md={role == 1 ? 10 : 16} sx={{ mt: 2 }}>
          {/* <Item> */}
          <InputLabel id="demo-simple-select-label" sx={{ mb: 2 }}>
            ジャンル名
          </InputLabel>
          <OutlinedInput
            type="text"
            color="primary"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
            required
            fullWidth
          />
        </Grid>
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
    </Box>
  );
};

export default CreateGenre;
