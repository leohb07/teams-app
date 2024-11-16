import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Container, Logo } from "./styles";

import LogoImg from "@assets/logo.png";

type HeaderProps = {
  canShowBackButton?: boolean;
};

export function Header({ canShowBackButton = false }: HeaderProps) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("groups");
  };

  return (
    <Container>
      {canShowBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={LogoImg} />
    </Container>
  );
}
