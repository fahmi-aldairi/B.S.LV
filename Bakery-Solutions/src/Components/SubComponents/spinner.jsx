/* eslint-disable no-unused-vars */
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export default function Spinner() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <Backdrop
        sx={{ color: "#8B4403", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
