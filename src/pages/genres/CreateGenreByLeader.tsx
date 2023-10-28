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
  
  import { AddGenre,  getAllCategories, getAllGroups } from "../../redux/actionCreators/userActions";
  import { RootState } from "../../redux/store/store";
  import { useNavigate } from "react-router-dom";
  import jwt_decode from "jwt-decode";
import { green } from "@mui/material/colors";
  
  interface IUser {
    name: string;
    user_id?: string | null;
    role_id: string;
  }
  
  const CreateGenreByLeader: FC = (): ReactElement => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["usertoken"]);
    const usertoken = cookies.usertoken;
    const dispatch = useDispatch();
    const allSteps = useSelector((state: RootState) => state.users.categories);

    const [selectedStep, setSelectedStep] = useState("");
    const [genre, setGenre] = useState("");
  

    useEffect(() => {
      dispatch(getAllCategories());
    }, []);
  
    const handleStepChange = (event: SelectChangeEvent) => {
      setSelectedStep(event.target.value as string);
    };
  
    const handleSubmit = (event: any) => {
      event.preventDefault();
  
      const newGenre = {
        // group_id: '',
        category_id : selectedStep,
        name: genre,
      };
  
      dispatch(AddGenre(navigate, newGenre));
    };
  
    return (
      <Box sx={{ width: "80%", mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={16} md={6}>
                  <InputLabel id="demo-simple-select-label" sx={{ mb: 2 }}>
                    グループを選択
                  </InputLabel>
                  <Select
                    labelId="group-select-label"
                    id="group-select"
                    value={selectedStep}
                    onChange={handleStepChange}
                    fullWidth
                    required
                  >
                    {allSteps?.map((step: any) => {
                      return (
                        <MenuItem key={step.id + "step"} value={step.id}>
                          {step.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
  
              <Grid item xs={16} md={10}>
                <InputLabel id="demo-simple-select-label" sx={{ mb: 2 }}>
                  ステップ名
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
      </Box>
    );
  };
  
  export default CreateGenreByLeader;
  