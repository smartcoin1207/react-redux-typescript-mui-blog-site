import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ReactElement, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { RootState } from "../../redux/store/store";


const StepList: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const steps = useSelector((state:RootState) => state.users.basicCategories);

  useEffect(() => {
    
  },[])


  return (
    <div>
        {/* Step List */}
    </div>
  );
};

export default StepList;