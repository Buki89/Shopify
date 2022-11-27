import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ListItem, useAuth, useData } from "../core";
import { ShopingItem } from "../core/types";

const Layout = dynamic(() => import("../core/components/Layout/Layout"), {
  ssr: false,
});

type DashboardProps = {};

const Dashboard: FC<DashboardProps> = () => {
  const { user } = useAuth();
  console.log("user", user);
  const { list, loading, getList, addItem, updateItem } = useData(user?.uid);

  const [name, setName] = useState<string | null>("");
  const { palette } = useTheme();

  useEffect(() => {
    if (user) {
      getList();
    }
  }, [user]);

  const handleChange = useCallback(
    (
      event: SyntheticEvent<Element, Event>,
      value: string | null,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<string> | undefined
    ) => {
      console.log("value", value);
      setName(value);
    },
    []
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (name && name.length > 0) {
      addItem(name);
      setName("");
    }
  };

  const handleChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleChangeItem = (payload: ShopingItem) => {
    console.log("payload", payload);
    updateItem(payload);
  };

  const remainingItems = list.filter((item) => !item.done);

  const finishedItems = list.filter((item) => item.done);

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center" mb="1rem">
          <Autocomplete
            freeSolo={true}
            value={name}
            onChange={handleChange}
            fullWidth={true}
            size="small"
            sx={{ marginRight: "1rem" }}
            options={["rohlík", "kobliha"]}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="piš zde..."
                label="Položka"
                onChange={handleChangeText}
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
          <IconButton type="submit">
            <FontAwesomeIcon
              fontSize="2rem"
              color={palette.secondary.dark}
              icon={faCirclePlus}
            />
          </IconButton>
        </Box>
        <Divider />
      </form>
      {loading ? (
        Array.from(Array(10)).map((_, i) => {
          return (
            <Box key={i} pb="0.5rem">
              <Skeleton
                variant="rounded"
                animation="wave"
                width="100%"
                height={50}
              />
            </Box>
          );
        })
      ) : (
        <>
          <Stack spacing={1} mt="1rem">
            <Typography
              color={
                remainingItems.length === 0
                  ? palette.success.light
                  : palette.text.primary
              }
              textAlign="end"
            >{`Položky ${list.filter((item) => item.done).length}/${
              list.length
            }`}</Typography>
            {remainingItems.length > 0 && (
              <>
                <Divider />
                <Typography fontSize="0.75rem">Zbývá</Typography>
              </>
            )}
            {list.length === 0 ? (
              <p>no items</p>
            ) : (
              <>
                {remainingItems.map((item, index: number) => (
                  <ListItem
                    key={index}
                    item={item}
                    onChange={handleChangeItem}
                  />
                ))}
                {finishedItems.length > 0 && (
                  <>
                    <Divider />
                    <Typography fontSize="0.75rem">Hotovo</Typography>{" "}
                  </>
                )}
                {finishedItems.map((item, index: number) => (
                  <ListItem
                    key={index}
                    item={item}
                    onChange={handleChangeItem}
                  />
                ))}
              </>
            )}
          </Stack>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
