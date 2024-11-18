import { RefObject } from "react";
import { TextInput, TextInputProps } from "react-native";

import { Container } from "./styles";

type InputProps = TextInputProps & {
  inputRef?: RefObject<TextInput>;
};

export function Input({ inputRef, ...rest }: InputProps) {
  return <Container ref={inputRef} {...rest} />;
}
