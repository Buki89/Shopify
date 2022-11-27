import { Box, Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Home: NextPage = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();
  console.log("user", user);

  console.log("user", user);

  const handleClick = useCallback(async () => {
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      console.log("err", err);
    }
  }, [signInWithGoogle, router]);

  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        Sign in with google
      </Button>
    </Box>
  );
};

export default Home;
