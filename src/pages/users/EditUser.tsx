import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import "dayjs/locale/ja";
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
  FormLabel,
} from "@mui/material";
import { Category, Edit, Groups } from "@mui/icons-material";

import { ICategory } from "../../models/category";
import {
  AddLeader,
  AddUser,
  EditLeaderAction,
  EditUserAction,
  GetUserById,
  getAllGroups,
  getData,
} from "../../redux/actionCreators/userActions";
// import "../../assets/css/style.css";
import { RootState } from "../../redux/store/store";
import { ThemeColor } from "../../styles/GlobalStyle";
import { getAllCategories } from "../../redux/actionCreators/blogActions";
import { Root } from "react-dom/client";
import { current } from "@reduxjs/toolkit";
import { serverUrl } from "../../services/axios";
import { group } from "console";

interface IUser {
  name: string;
  user_id?: string | null;
  role_id: string;
}

const EditUser = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const all_categories = useSelector(
    (state: RootState) => state.blog.all_categories
  );
  const all_groups = useSelector((state: RootState) => state.blog.all_groups);
  const user = useSelector((state: RootState) => state.auth.user );
  const current_user = useSelector((state: RootState) => state.users.current_user );

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["usertoken"]);
  const usertoken = cookies.usertoken;
  const [name, setName] = useState("");
  const [read_name, setReadName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("1990-01-01");
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
  const [status, setStatus] = useState("1");

  const [commonData, setCommonData] = useState<ICategory[]>([]);
  const [commonData2, setCommonData2] = useState<ICategory[]>([]);

  const [groupData, setGroupData] = useState<ICategory[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [teamGroups, setTeamGroups] = useState<any[]>([]);
  const [allowedCommonCategories, setAllowedCommonCategories] = useState<any[]>(
    []
  );
  const [allowedCommon2Categories, setAllowedCommon2Categories] = useState<
    any[]
  >([]);

  const [allowedGroupCategories, setAllowedGroupCategories] = useState<any[]>(
    []
  );
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(true);

  let role: number = 0;

  if (usertoken) {
    const user: IUser = jwt_decode(usertoken);
    role = user ? parseInt(user.role_id, 10) : 4;
  }

  useEffect(() => {
    dispatch(GetUserById(id));
  }, [])

  useEffect(() => {
    if (role == 2) {
      setShowRoleSelection(false);
      setSelectedRole("3");
    }
  }, []);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if(current_user) {
      setName(current_user.name);
      setReadName(current_user.read_name);
      setEmail(current_user.email);
      setDateOfBirth(current_user.birthday);
      setSelectedAvatar(`${serverUrl}upload/images/${current_user.avatar}`);
      setSelectedGroupId(current_user.group_id);
      
      setUserId(current_user.user_id);
      setPhone(current_user.phone_number);
      setMemo(current_user.memo);
      setSelectedRole(current_user.role_id);
      if(current_user.phone_device == 'android') {
        setSelectedDevice('1');
      } else {
        setSelectedDevice('2');
      }

      
      setNinetieth_life(current_user.ninetieth_life);
      setWork_life(current_user.work_life);
      setDie_life(current_user.die_life);
      setHealthy_life(current_user.healthy_life);
      setAverage_life(current_user.average_life);
      setStatus(current_user.status);

      const allowed_categories = JSON.parse(current_user?.allowed_categories);

      setAllowedGroupCategories(allowed_categories[current_user.group_id]);
      setAllowedCommonCategories(allowed_categories['1']);
      setAllowedCommon2Categories(allowed_categories['2']);
    }
  }, [current_user]);

  useEffect(() => {
    if (all_groups) {
      const filteredGroups = all_groups.filter(
        (group) => group.id != 1 && group.id != 2
      );
      all_groups.forEach((group1:any) => {
        if(group1.id == current_user?.group_id) {
          setSelectedGroup(group1);
          return 0;
        }
      });
      setTeamGroups(filteredGroups);
    } 
    if(role == 2) {
      if(user)
      setSelectedGroupId(user?.group_id);
    }
  }, [all_groups]);


  useEffect(() => {
    if(all_categories) {
      setCommonData(all_categories['1']);
      setCommonData2(all_categories['2']);

      setGroupData(all_categories[`${selectedGroupId}`]);
    }
  }, [all_categories]);

  const isSelfGroupShow = () => {
    let isSelfGroupShow: boolean = false;
    if(selectedRole == '3' && groupData){
      isSelfGroupShow = true;      
    }
    
    return isSelfGroupShow;
  }

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
    if (!selectedGroupId) {
      setGroupData([]);
    }
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedGroupId(event.target.value as string);
    let tmp = null;
    teamGroups.forEach((group) => {
      if (group.id == event.target.value) {
        tmp = group;
        return;
      }
    });
    setSelectedGroup(tmp);

    if(all_categories) {
      setGroupData(all_categories[event.target.value as string]);
    }
  };

  const handleDeviceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDevice(event.target.value);
  };

  //common1 group
  const handleCommonCheckboxChange = (event: any) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setAllowedCommonCategories((prevValues: any[]) => [...prevValues, value]);
      console.log(allowedCommonCategories);
    } else {
      setAllowedCommonCategories((prevValues: any[]) =>
        prevValues.filter((v) => v !== value)
      );
    }
  };

  //common2 group
  const handleCommon2CheckboxChange = (event: any) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setAllowedCommon2Categories((prevValues: any[]) => [
        ...prevValues,
        value,
      ]);
      console.log(allowedCommonCategories);
    } else {
      setAllowedCommon2Categories((prevValues: any[]) =>
        prevValues.filter((v) => v !== value)
      );
    }
  };

  //my group
  const handleGroupCheckboxChange = (event: any) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setAllowedGroupCategories((prevValues: any[]) => [...prevValues, value]);
    } else {
      setAllowedGroupCategories((prevValues: any[]) =>
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
    // formData.append("password", password);
    formData.append("birthday", dateOfBirth);
    formData.append("user_id", user_id);
    formData.append("phone_number", phone);
    formData.append("phone_device", selectedDevice);
    formData.append("role_id", selectedRole);
    formData.append("group_id", selectedGroupId);
    formData.append("status", "1");
    formData.append("memo", memo);
    formData.append("ninetieth_life", ninetieth_life);
    formData.append("work_life", work_life);
    formData.append("die_life", die_life);
    formData.append("healthy_life", healthy_life);
    formData.append("average_life", average_life);
    formData.append("status", status);

    let allowed_categories = null;
    
    if(role == 1 && selectedRole == '2') {
      allowed_categories = {
        '2' : allowedCommon2Categories,
      }
    } else  if(role ==1 && selectedRole == '3') {
      allowed_categories = {
        '1' : allowedCommonCategories,
        [selectedGroupId] : allowedGroupCategories,
      }
    } else if(role == 2) {
      allowed_categories = {
        '1' : allowedCommonCategories,
        [selectedGroupId] : allowedGroupCategories
      }
    }

    formData.append("allowed_categories", JSON.stringify(allowed_categories));

    if(selectedRole == '2' || current_user.role_id == '2') {
      dispatch(EditLeaderAction(navigate, formData, id));
    } 
    else {
      dispatch(EditUserAction(navigate, formData, id));
    }
  };

  return (
    <Box sx={{ width: { xs: "100%", ms: "90%", md: "80%", lg: "50%" }, mb: 2 }}>
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
        ユーザーの編集
      </Typography>

      <Card
        sx={{
          // mt: 1,
          border: "solid 2px initial",
          borderRadius: '10px',
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

            {(showRoleSelection && current_user?.role_id != '2') &&  (
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
                  value={selectedGroupId}
                  label="グループを選択"
                  onChange={handleSelectChange}
                  required
                >
                  {teamGroups?.map((group: any) => {
                    return (
                      <MenuItem key={group.id + 1000} value={group.id}>
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

            <Box sx={{ mb: 4, width: "100%" }}>
              <DatePicker
                format="YYYY/MM/DD"
                onChange={handleDateChange}
                value={ dayjs(dateOfBirth)}
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
              {/* <Grid item xs={12} md={6}>
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
              </Grid> */}
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
                      label="android"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="iPhone"
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
            {isSelfGroupShow() && (
              <Card
                sx={{
                  mb: 4,
                  border: "solid 1px #2196f3",
                }}
              >
                <CardHeader
                  title={
                    (role == 2 ? "私の" : selectedGroup?.name) +
                    "グループ内のカテゴリ閲覧権限"
                  }
                />

                <Divider sx={{ border: "1px dotted #2196f3" }} />

                <CardContent>
                  {groupData?.map((checkbox: ICategory) => (
                    <FormControlLabel
                      key={checkbox.id}
                      control={
                        <Checkbox
                          checked={allowedGroupCategories.includes(
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

            {selectedRole == "3" && (
              <Card
                sx={{
                  mb: 4,
                  border: "solid 1px #2196f3",
                }}
              >
                <CardHeader title="全体共通グループ 【1】 内のカテゴリ閲覧権限" />
                <Divider sx={{ border: "1px dotted #2196f3" }} />

                <CardContent>
                  {commonData?.map((checkbox: ICategory) => (
                    <FormControlLabel
                      key={checkbox.id}
                      control={
                        <Checkbox
                          checked={allowedCommonCategories.includes(
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
            )}

            {selectedRole == "2" && (
              <Card
                sx={{
                  mb: 4,
                  border: "solid 1px #2196f3",
                }}
              >
                <CardHeader title="全体共通グループ 【2】 内のカテゴリ閲覧権限" />
                <Divider sx={{ border: "1px dotted #2196f3" }} />

                <CardContent>
                  {commonData2?.map((checkbox: ICategory) => (
                    <FormControlLabel
                      key={checkbox.id}
                      control={
                        <Checkbox
                          checked={allowedCommon2Categories?.includes(
                            `${checkbox.id}`
                          )}
                          onChange={handleCommon2CheckboxChange}
                          value={checkbox.id}
                        />
                      }
                      label={checkbox.name}
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            <Box sx={{ ml: 0, mb: 2 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{ fontSize: "1.5rem", ml: 1, fontWeight: 400 }}
              >
                ステータス
              </FormLabel>
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <RadioGroup
                    aria-labelledby="status-radio-buttons-group-label"
                    value={status}
                    name="radio-buttons-group"
                    onChange={handleStatusChange}
                    sx={{ ml: 2 }}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="OK"
                      defaultChecked
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="一時停止"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="ブロック"
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Box>

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              sx={{ textAlign: "right", mb: 2, float: "right" }}
            >
              登録する
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditUser;
