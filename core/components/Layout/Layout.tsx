import {
  Card as CardBase,
  Box,
  useTheme,
  Typography,
  styled,
} from "@mui/material";
import { FC, ReactNode } from "react";

const Card = styled(CardBase)`
  height: calc(100vh - 50px);
  padding: 1rem;
`;

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        bgcolor={theme.palette.secondary.dark}
        height="50px"
      >
        <Typography
          fontSize="1.25rem"
          color="#fff"
          fontWeight={700}
          variant="body1"
        >
          Shopify
        </Typography>
      </Box>
      <Card>{children}</Card>
    </>
  );
};

export default Layout;
