import { BackButton, BackIcon, Container, Logo } from "./styles";

import LogoImg from "@assets/logo.png";

type HeaderProps = {
  canShowBackButton?: boolean;
};

export function Header({ canShowBackButton = false }: HeaderProps) {
  return (
    <Container>
      {canShowBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={LogoImg} />
    </Container>
  );
}
