import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styled from "styled-components/native";

export type ButtonIconTypeStylesProps = "PRIMARY" | "SECONDARY";

type IconProps = {
  type: ButtonIconTypeStylesProps;
};

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 2px;
`;

export const Icon = styled(MaterialIcons).attrs<IconProps>(
  ({ theme, type }) => ({
    size: 24,
    color: type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK,
  })
)``;
