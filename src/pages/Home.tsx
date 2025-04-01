import { Box, Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
      <Typography variant="h3">ComicTracker</Typography>
    </Box>
  );
};

export default Home;
