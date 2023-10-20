import React, { useState, useRef, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Stack,
  Box,
  FormControl,
  FormLabel,
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormGroup,
  Checkbox,
  Grid,
  Input,
  InputLabel,
  Avatar,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import { ICategory } from "../../models/category";
import { date } from "yup";
import { AddUser } from "../../redux/actionCreators/userActions";
import "../../assets/css/style.css";
// import { Link } from "react-router-dom";
// import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatarInputRef = useRef<HTMLInputElement>(null);

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

  const [selectedCommonValues, setSelectedCommonValues] = useState<any[]>([]);
  const [selectedGroupValues, setSelectedGroupValues] = useState<any[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [editAvatarButtonShow, setEditAvatarButtonShow] = useState(false);

  const commonData: ICategory[] = [
    { name: "c1", id: "1" },
    { name: "c2", id: "2" },
    { name: "c3", id: "3" },
  ];
  const groupData: ICategory[] = [
    { name: "G1", id: "1" },
    { name: "G2", id: "2" },
    { name: "G3", id: "3" },
  ];

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
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
      setSelectedAvatar(URL.createObjectURL(file));
    } else {
      setSelectedAvatar("");
    }
  };

  const handleEditAvatar = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const data = {
      name: name,
      read_name: read_name,
      email: email,
      password: password,
      birthday: dateOfBirth,
      user_id: user_id,
      phone_number: phone,
      phone_device: selectedDevice,
      role_id: selectedRole,
      group_id: "2",
      status: "1",
      memo: memo,
      ninetieth_life: ninetieth_life,
      work_life: work_life,
      die_life: die_life,
      healthy_life: healthy_life,
      average_life: average_life,
      common1_permission: selectedCommonValues,
      mygroup_permission: selectedGroupValues,
    };

    console.log(data);

    dispatch(AddUser(navigate, data));
  };

  return (
      <Box>
        <Card
          sx={{
            mt: 1,
            border: "solid 4px #2196f3",
            width: '100%'
          }}
        >
          <CardHeader
            title="ユーザー登録"
            sx={{
              justifyContent: "center",
              color: "white",
              backgroundColor: "#2196f3",
            }}
          />

          <Divider sx={{ border: "1px dotted #2196f3" }} />
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
                    src={selectedAvatar ? selectedAvatar : ''}
                    onMouseEnter={(event) => {
                      setEditAvatarButtonShow(true);
                      // const edit_icon = document.getElementById('edit-avatar-icon');
                      // if(edit_icon)
                      // edit_icon.style.display = 'block';                 
                       }}
                    onMouseLeave={(event) => {
                      setEditAvatarButtonShow(false)
                      // const edit_icon = document.getElementById('edit-avatar-icon');
                      // if(edit_icon)

                      // edit_icon.style.display = 'none';   
                    }}
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
                    <Edit  sx={{ width: "40px", height: "40px", }} />
                  </IconButton>
                </Box>
              {/* ) : (
                <>
                  <Button variant="contained" component="label">
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
                </>
              )} */}

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

              <Typography sx={{ mt: 4, ml: 2 }} variant="body1">
                生年月日
              </Typography>
              <TextField
                type="date"
                variant="outlined"
                color="primary"
                onChange={(e) => setDateOfBirth(e.target.value)}
                value={dateOfBirth}
                fullWidth
                required
                sx={{ mb: 4 }}
              />

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
                      <ListItemText primary="・人生の9割が確定を何歳に設定?" />

                      <TextField
                        type="number"
                        label=""
                        size="small"
                        sx={{ width: "70px" }}
                        value={ninetieth_life}
                        onChange={(e) => setNinetieth_life(e.target.value)}
                        inputProps={{ min: 0, max: 999 }}
                      />
                    </ListItem>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="・労働寿命を何歳に設定?" />

                      <TextField
                        type="number"
                        label=""
                        size="small"
                        sx={{ width: "70px" }}
                        value={work_life}
                        onChange={(e) => setWork_life(e.target.value)}
                        inputProps={{ min: 0, max: 999 }}
                      />
                    </ListItem>

                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="・死んでいるかもしれない日の設定" />

                      <TextField
                        type="number"
                        label=""
                        size="small"
                        sx={{ width: "70px" }}
                        value={die_life}
                        onChange={(e) => setDie_life(e.target.value)}
                        inputProps={{ min: 0, max: 999 }}
                      />
                    </ListItem>

                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="・健康寿命" />

                      <TextField
                        type="number"
                        label=""
                        size="small"
                        sx={{ width: "70px" }}
                        value={healthy_life}
                        onChange={(e) => setHealthy_life(e.target.value)}
                        inputProps={{ min: 0, max: 999 }}
                      />
                    </ListItem>

                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="・平均寿命" />

                      <TextField
                        type="number"
                        label=""
                        size="small"
                        sx={{ width: "70px" }}
                        value={average_life}
                        onChange={(e) => setAverage_life(e.target.value)}
                        inputProps={{ min: 0, max: 999 }}
                      />
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
                            checked={selectedGroupValues.includes(checkbox.id)}
                            onChange={handleGroupCheckboxChange}
                            value={checkbox.id}
                          />
                        }
                        label={checkbox.name}
                      />
                    ))}
                    {/* <FormControlLabel
                  control={<Checkbox />}
                  label="大カテゴリ1"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="大カテゴリ2"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="大カテゴリ3"
                /> */}
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
                          checked={selectedCommonValues.includes(checkbox.id)}
                          onChange={handleCommonCheckboxChange}
                          value={checkbox.id}
                        />
                      }
                      label={checkbox.name}
                    />
                  ))}
                  {/* <FormControlLabel
                    control={<Checkbox />}
                    label="大カテゴリ1"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="大カテゴリ2"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="大カテゴリ3"
                  /> */}
                </CardContent>
              </Card>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                sx={{ textAlign: "right" }}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
  );
};

export default CreateUser;
