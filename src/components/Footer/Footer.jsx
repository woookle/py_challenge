import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        backgroundColor: "#f4f3ee",
        color: "black",
        textAlign: "center",
      }}
    >
      <Typography variant="body1">
        <a
          href="https://github.com/woookle"
          target="_blank"
          className="footer_link"
        >
          @woookle
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
