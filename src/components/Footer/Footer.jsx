import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
      }}
    >
      <Typography variant="body1">
        <a
          href="https://github.com/woookle"
          target="_blank"
          style={{
            color: "black",
            textDecoration: "none",
            fontWeight: "bold",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          @woookle
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
