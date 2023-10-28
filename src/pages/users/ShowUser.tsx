import { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

const ShowUser: FC = (): ReactElement => {
  const { id } = useParams();
  console.log(id)
  return (
    <div>
        show User
    </div>
  );
};

export default ShowUser;