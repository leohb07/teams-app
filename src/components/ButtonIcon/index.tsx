import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { ButtonIconTypeStylesProps, Container, Icon } from "./styles";

type ButtonIconProps = TouchableOpacityProps & {
  iconName: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStylesProps;
};

export function ButtonIcon({
  iconName,
  type = "PRIMARY",
  ...rest
}: ButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={iconName} type={type} />
    </Container>
  );
}
