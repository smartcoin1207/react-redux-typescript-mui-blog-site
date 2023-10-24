import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

const Page404 = () => (
  <div className="text-center">
    <h1 className="display-1 font-weight-bold">404</h1>
    <p className="h1">Page not found.</p>
    <p className="h2 font-weight-normal mt-3 mb-4">
    お探しのページは削除された可能性があります。
    </p>
    <Link to="/">
      <Button color="primary" >
      ウェブサイトに戻る
      </Button>
    </Link>
  </div>
);

export default Page404;
