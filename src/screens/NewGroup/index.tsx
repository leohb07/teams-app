import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { SafeArea } from "@components/SafeArea";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroup() {
  return (
    <SafeArea>
      <Container>
        <Header canShowBackButton />

        <Content>
          <Icon />

          <Highlight
            title="Nova turma"
            subtitle="crie a turma para adicionar as pessoas"
          />

          <Input placeholder="Nome da turma" />

          <Button title="Criar" style={{ marginTop: 24 }} />
        </Content>
      </Container>
    </SafeArea>
  );
}
