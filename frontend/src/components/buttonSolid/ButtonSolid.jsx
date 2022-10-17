import Button from "@mui/material/Button";

import React from "react";

export default function ButtonPrimary({
  label,
  colorBack,
  colorText,
  colorOutline,
}) {
  const boxShadow =
    "0px 2px 4px -1px rgb(0 0 0 / 2%), 0px 4px 5px 0px rgb(0 0 0 / 3%), 0px 1px 10px 0px rgb(0 0 0 / 0%)";
  const fontFamily = "Poppins, sans-serif";

  return (
    <Button
      sx={{
        color: `${colorText}`,
        fontFamily: `${fontFamily}`,
        fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem" },
        borderRadius: "10px",
        padding: "6px 30px",
        margin: "0",
        color: `${colorText}`,
        border: `2px ${colorOutline} solid`,
        backgroundColor: `${colorBack}`,
        transition: "all .2s",
        "&:hover": {
          backgroundColor: `${colorBack}`,
          transform: "translateY(-3px)",
          boxShadow: { boxShadow },
        },
        "&:active": {
          backgroundColor: `${colorBack}`,
          transform: "translateY(-1px)",
          boxShadow: { boxShadow },
        },
      }}
    >
      {label}
    </Button>
  );
}
