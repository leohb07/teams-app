import { ReactNode } from "react";
import { Wrapper } from "./styles";

type SafeAreaProps = {
  children: ReactNode;
};

export function SafeArea({ children }: SafeAreaProps) {
  return <Wrapper>{children}</Wrapper>;
}
