import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
} from "@mui/material";
import { Category, Edit, Groups } from "@mui/icons-material";

import { ICategory } from "../../models/category";
import {
  AddLeader,
  AddUser,
  getAllGroups,
  getData,
} from "../../redux/actionCreators/userActions";
import "../../assets/css/style.css";
import { RootState } from "../../redux/store/store";
import { group } from "console";
import { ThemeColor } from "../../styles/GlobalStyle";

interface IUser {
  name: string;
  user_id?: string | null;
  role_id: string;
}

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basicCategories = useSelector(
    (state: RootState) => state.users.basicCategories
  );
  const allGroups = useSelector((state: RootState) => state.users.groups);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["usertoken"]);
  const usertoken = cookies.usertoken;
  const [name, setName] = useState("");
  const [read_name, setReadName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [user_id, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const [memo, setMemo] = useState("");
  const [selectedRole, setSelectedRole] = useState("2");
  const [selectedDevice, setSelectedDevice] = useState("1");
  const [ninetieth_life, setNinetieth_life] = useState("");
  const [work_life, setWork_life] = useState("");
  const [die_life, setDie_life] = useState("");
  const [healthy_life, setHealthy_life] = useState("");
  const [average_life, setAverage_life] = useState("");
  const [commonData, setCommonData] = useState<ICategory[]>([]);
  const [groupData, setGroupData] = useState<ICategory[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [teamGroups, setTeamGroups] = useState<any[]>([]);
  const [selectedCommonValues, setSelectedCommonValues] = useState<any[]>([]);
  const [selectedGroupValues, setSelectedGroupValues] = useState<any[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(true);

  let role: number = 0;

  if (usertoken) {
    const user: IUser = jwt_decode(usertoken);
    role = user ? parseInt(user.role_id, 10) : 4;
  }

  useEffect(() => {
    if (role == 2) {
      setShowRoleSelection(false);
      setSelectedRole("3");
    } else {
      dispatch(getAllGroups());
    }
  }, []);

  useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    if (allGroups) {
      const filteredGroups = allGroups.filter((group) => group.id !== 1);
      setTeamGroups(filteredGroups);
    }
  }, [allGroups]);

  useEffect(() => {
    if (basicCategories) {
      if (basicCategories.common_group_categories != null) {
        setCommonData(basicCategories.common_group_categories);
      }

      if (basicCategories.mygroup_categories != null) {
        setGroupData(basicCategories.mygroup_categories);
        console.log(basicCategories.mygroup_categories)
      }
    }
  }, [basicCategories]);

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
    if(!selectedGroup) {
      setGroupData([]);

    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedGroup(event.target.value as string);

      if(basicCategories) {
        if (basicCategories.mygroup_categories != null) {

          let temp :any[] = [];
          
          basicCategories.mygroup_categories.forEach(category => {
            if(category?.group_id == event.target.value) {
              temp.push(category);
            }
          });

          setGroupData(temp);
        }
      }
  };

  const handleDeviceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDevice(event.target.value);
  };

  //common group
  const handleCommonCheckboxChange = (event: any) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCommonValues((prevValues: any[]) => [...prevValues, value]);
      console.log(selectedCommonValues);
    } else {
      setSelectedCommonValues((prevValues: any[]) =>
        prevValues.filter((v) => v !== value)
      );
    }
  };

  //my group
  const handleGroupCheckboxChange = (event: any) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedGroupValues((prevValues: any[]) => [...prevValues, value]);
    } else {
      setSelectedGroupValues((prevValues: any[]) =>
        prevValues.filter((v) => v !== value)
      );
    }
  };

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.split("/")[0]; // Get the file type

      if (fileType === "image") {
        setSelectedAvatar(URL.createObjectURL(file));
        setAvatar(file);
      } else {
        console.error("Invalid file type. Please select an image file.");
      }
    } else {
      setSelectedAvatar("");
    }
  };

  const handleEditAvatar = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleDateChange = (date: any) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    console.log(formattedDate);
    setDateOfBirth(formattedDate);
    // Do something with the formattedDate (e.g., update state)
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = new FormData();

    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("name", name);
    formData.append("read_name", read_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birthday", dateOfBirth);
    formData.append("user_id", user_id);
    formData.append("phone", phone);
    formData.append("phone_device", selectedDevice);
    formData.append("role_id", selectedRole);
    formData.append("group_id", selectedGroup);
    formData.append("status", "1");
    formData.append("memo", memo);
    formData.append("ninetieth_life", ninetieth_life);
    formData.append("work_life", work_life);
    formData.append("die_life", die_life);
    formData.append("healthy_life", healthy_life);
    formData.append("average_life", average_life);
    console.log(selectedCommonValues);
    console.log(selectedGroupValues);

    selectedCommonValues.forEach((element, index) => {
      formData.append(`common1_permission[${index}]`, element);
    });

    selectedGroupValues.forEach((element, index) => {
      formData.append(`mygroup_permission[${index}]`, element);
    });

    if (role == 1 && selectedRole == "2") {
      dispatch(AddLeader(navigate, formData));
    } else {
      dispatch(AddUser(navigate, formData));
    }

  };

  return (
    <Box sx={{ width: { xs: "100%", ms: "90%", md: "80%", lg: "50%" } }}>
      {/* <CardHeader
          title="ユーザー登録"
          sx={{
            justifyContent: "center",
            color: "white",
            backgroundColor: "#2196f3",
            fontWeight: '600'
          }}
        /> */}
      <Typography
        sx={{
          fontSize: "2rem",
          mt: 1,
          mb: 1,
          color: ThemeColor.main,
          fontWeight: "600",
        }}
        variant="h4"
      >
        ユーザー登録
      </Typography>

      <Card
        sx={{
          // mt: 1,
          border: "solid 2px #2196f3",
          width: "100%",
        }}
      >
        {/* <Divider sx={{ border: "1px dotted #2196f3" }} /> */}
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                position: "relative",
                width: 130,
                height: 130,
                m: "auto",
                p: 0,
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 130,
                  height: 130,
                  m: "auto",
                  p: 0,
                  justifyContent: "center",
                }}
                src={selectedAvatar ? selectedAvatar : ""}
              />
              <IconButton
                id="edit-avatar-icon"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                onClick={handleEditAvatar}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{ display: "none" }}
                >
                  Avatar
                  <input
                    ref={avatarInputRef}
                    id="avatar-upload"
                    type="file"
                    onChange={handleAvatarUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </Button>
                <Edit sx={{ width: "40px", height: "40px" }} />
              </IconButton>
            </Box>
            <Stack spacing={2} direction="row" sx={{ mb: 4, mt: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="primary"
                label="名前"
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: "10px" }}
                value={name}
                fullWidth
                required
              />
              <TextField
                type="text"
                variant="outlined"
                color="primary"
                label="読み"
                onChange={(e) => setReadName(e.target.value)}
                value={read_name}
                fullWidth
                required
              />
            </Stack>
            {showRoleSelection && (
              <Card
                sx={{
                  marginTop: "20px",
                  border: "solid 1px #2196f3",
                }}
              >
                <CardHeader title="ユーザー権限" sx={{ fontSize: "16px" }} />
                <Divider sx={{ border: "1px dotted #2196f3" }} />

                <CardContent>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={selectedRole}
                      onChange={handleRoleChange}
                    >
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="管理者権限(グループリーダー)"
                        defaultChecked
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="閲覧のみユーザー"
                      />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            )}

            {selectedRole == "3" && role == 1 && (
              <FormControl sx={{ mt: 4 }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  グループを選択
                </InputLabel>
                <Select
                  labelId="group-select-label"
                  id="user-group-select"
                  value={selectedGroup}
                  label="グループを選択"
                  onChange={handleSelectChange}
                  required
                >
                  {teamGroups?.map((group: any) => {
                    return (
                      <MenuItem key={group.id + "group"} value={group.id}>
                        {group.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}

            <Typography sx={{ mt: 4, mb: 1, ml: 1 }} variant="body1">
              生年月日
            </Typography>
            {/* <TextField
  type="date"
  variant="outlined"
  color="primary"
  onChange={(e) => setDateOfBirth(e.target.value)}
  value={dateOfBirth}
  fullWidth
  required
  inputProps={{
    pattern: "\\d{4}-\\d{2}-\\d{2}", // Regular expression for yyyy/mm/dd format
  }}
  sx={{ mb: 4 }}
/> */}
            <Box sx={{ mb: 4, width: "100%" }}>
              <DatePicker
                format="YYYY/MM/DD"
                onChange={handleDateChange}
                defaultValue={dayjs("1990-01-01")}
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="email"
                  variant="outlined"
                  color="primary"
                  label="メールアドレス"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="phone"
                  variant="outlined"
                  color="primary"
                  label="電話番号"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="ログインID"
                  onChange={(e) => setUserId(e.target.value)}
                  value={user_id}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="ログインパスワード"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  fullWidth
                  sx={{ mb: 4 }}
                />
              </Grid>
            </Grid>

            <Card
              sx={{
                mb: 4,
                border: "solid 1px #2196f3",
              }}
            >
              <CardHeader title="使用スマホ端末" />
              <Divider sx={{ border: "1px dotted #2196f3" }} />

              <CardContent>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedDevice}
                    onChange={handleDeviceChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="iPhone"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="android"
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>

            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="メモ欄、 職業、 性格など"
              onChange={(e) => setMemo(e.target.value)}
              value={memo}
              multiline
              fullWidth
              rows={4}
              sx={{ mb: 4 }}
            />

            <Card
              sx={{
                mb: 4,
                border: "solid 1px #2196f3",
              }}
            >
              <CardHeader title="残りの寿命設定" />
              <Divider sx={{ border: "1px dotted #2196f3" }} />

              <CardContent>
                {/* <FormControl> */}
                <List>
                  <ListItem sx={{ padding: 0, margin: 0 }}>
                    <ListItemText primary="・人生の9割が確定する(30歳)まで" />

                    <TextField
                      type="number"
                      label=""
                      size="small"
                      sx={{ width: "70px" }}
                      value={ninetieth_life}
                      onChange={(e) => setNinetieth_life(e.target.value)}
                      inputProps={{ min: 0, max: 999 }}
                    />
                    <Typography variant="h6" sx={{ pl: 1 }}>
                      {" "}
                      年
                    </Typography>
                  </ListItem>
                  <Divider sx={{ mt: 1, mb: 1 }} />
                  <ListItem sx={{ padding: 0, margin: 0 }}>
                    <ListItemText primary="・労働寿命まで後" />

                    <TextField
                      type="number"
                      label=""
                      size="small"
                      sx={{ width: "70px" }}
                      value={work_life}
                      onChange={(e) => setWork_life(e.target.value)}
                      inputProps={{ min: 0, max: 999 }}
                    />
                    <Typography variant="h6" sx={{ pl: 1 }}>
                      {" "}
                      年
                    </Typography>
                  </ListItem>

                  <Divider sx={{ mt: 1, mb: 1 }} />
                  <ListItem sx={{ padding: 0, margin: 0 }}>
                    <ListItemText primary="・死んでいるかもしれない日まで" />

                    <TextField
                      type="number"
                      label=""
                      size="small"
                      sx={{ width: "70px" }}
                      value={die_life}
                      onChange={(e) => setDie_life(e.target.value)}
                      inputProps={{ min: 0, max: 999 }}
                    />
                    <Typography variant="h6" sx={{ pl: 1 }}>
                      {" "}
                      年
                    </Typography>
                  </ListItem>

                  <Divider sx={{ mt: 1, mb: 1 }} />
                  <ListItem sx={{ padding: 0, margin: 0 }}>
                    <ListItemText primary="・健康寿命まで後" />

                    <TextField
                      type="number"
                      label=""
                      size="small"
                      sx={{ width: "70px" }}
                      value={healthy_life}
                      onChange={(e) => setHealthy_life(e.target.value)}
                      inputProps={{ min: 0, max: 999 }}
                    />
                    <Typography variant="h6" sx={{ pl: 1 }}>
                      {" "}
                      年
                    </Typography>
                  </ListItem>

                  <Divider sx={{ mt: 1, mb: 1 }} />
                  <ListItem sx={{ padding: 0, margin: 0 }}>
                    <ListItemText primary="・平均寿命まで後" />

                    <TextField
                      type="number"
                      label=""
                      size="small"
                      sx={{ width: "70px" }}
                      value={average_life}
                      onChange={(e) => setAverage_life(e.target.value)}
                      inputProps={{ min: 0, max: 999 }}
                    />
                    <Typography variant="h6" sx={{ pl: 1 }}>
                      {" "}
                      年
                    </Typography>
                  </ListItem>
                  <Divider sx={{ mt: 1, mb: 1 }} />
                </List>

                {/* </FormControl> */}
              </CardContent>
            </Card>

            {selectedRole === "3" && (
              <Card
                sx={{
                  mb: 4,
                  border: "solid 1px #2196f3",
                }}
              >
                <CardHeader title="岩橋グループ内のカテゴリ閲覧権限" />
                <Divider sx={{ border: "1px dotted #2196f3" }} />

                <CardContent>
                  {groupData.map((checkbox: ICategory) => (
                    <FormControlLabel
                      key={checkbox.id}
                      control={
                        <Checkbox
                          checked={selectedGroupValues.includes(
                            `${checkbox.id}`
                          )}
                          onChange={handleGroupCheckboxChange}
                          value={checkbox.id}
                        />
                      }
                      label={checkbox.name}
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            <Card
              sx={{
                mb: 4,
                border: "solid 1px #2196f3",
              }}
            >
              <CardHeader title="全体共通グループ 【1】 内のカテゴリ閲覧権限" />
              <Divider sx={{ border: "1px dotted #2196f3" }} />

              <CardContent>
                {commonData.map((checkbox: ICategory) => (
                  <FormControlLabel
                    key={checkbox.id}
                    control={
                      <Checkbox
                        checked={selectedCommonValues.includes(
                          `${checkbox.id}`
                        )}
                        onChange={handleCommonCheckboxChange}
                        value={checkbox.id}
                      />
                    }
                    label={checkbox.name}
                  />
                ))}
              </CardContent>
            </Card>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              sx={{ textAlign: "right" }}
            >
              登録する
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateUser;
