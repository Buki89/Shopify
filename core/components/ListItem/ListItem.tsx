import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckCircle,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Checkbox,
  styled,
  Typography as TypographyBase,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";
import { ShopingItem } from "../../types";

const Typography = styled(TypographyBase)<{ done: boolean }>`
  text-decoration: ${({ done }) => (done ? "line-through" : "none")}; ;
`;

type ListItemProps = {
  item: ShopingItem;
  onChange: (item: ShopingItem) => void;
};

const ListItem: FC<ListItemProps> = ({ item, onChange }) => {
  const { palette } = useTheme();
  const handleChange = () => {
    onChange({ ...item, done: !item.done });
  };

  const handleIncrement = () => {
    onChange({ ...item, count: ++item.count });
  };

  const handleDecrement = () => {
    onChange({ ...item, count: --item.count });
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center">
        <Checkbox
          checkedIcon={
            <FontAwesomeIcon
              fontSize="1.5rem"
              icon={faCheckCircle}
              color={palette.success.light}
            />
          }
          icon={
            <FontAwesomeIcon
              fontSize="1.5rem"
              icon={faCircle}
              color={palette.error.dark}
            />
          }
          checked={item.done}
          onChange={handleChange}
        />

        <Typography
          fontWeight={700}
          mt="2px"
          color={item.done ? palette.success.light : palette.text.primary}
          done={item.done}
        >
          {item.name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {!item.done && (
          <FontAwesomeIcon icon={faPlus} onClick={handleIncrement} />
        )}
        <Typography
          fontWeight={700}
          mt="2px"
          mx="0.5rem"
          color={item.done ? palette.success.light : palette.text.primary}
          done={item.done}
        >{`${item.count}ks`}</Typography>
        {!item.done && (
          <FontAwesomeIcon icon={faMinus} onClick={handleDecrement} />
        )}
      </Box>
    </Box>
  );
};

export default ListItem;
