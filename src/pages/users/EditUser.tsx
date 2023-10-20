import { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

const EditUser: FC = (): ReactElement => {
  const { id } = useParams();
  console.log(id)
  return (
    <div>
        Edit User
    </div>
  );
};

export default EditUser;