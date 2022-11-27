import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Home: FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  console.log("error", error);
  const router = useRouter();
  console.log("user", user);

  console.log("user", user);

  const handleClick = useCallback(() => {
    try {
      signInWithGoogle().then(() => {
        router.push("/dashboard");
      });
    } catch (err) {
      console.log("err", err);
    }
  }, [signInWithGoogle, router]);

  return (
    <Box display="flex" flex="1" height="100vh" flexDirection="column">
      <Box flex="2" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h3">Shopify</Typography>
      </Box>
      <Box flex="3" display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained" onClick={handleClick}>
          Sign in with google
        </Button>
      </Box>
      <div style={{ width: "10px", height: "10px", backgroundColor: "#f00" }} />
    </Box>
  );
};

export default Home;
