import { Heading, VStack } from "native-base";
import { Header } from "../components/Header";

import Logo from '../assets/logo.svg';
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Find = () => {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header 
        title="Criar novo bolão"
        showBackButton={true}
      />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Encontre o bolão através do seu código único
        </Heading>

        <Input 
          mb={2}
          placeholder="Qual o código do bolão?"
        />

        <Button 
          title="BUSCAR BOLÃO"
        />
      </VStack>
    </VStack>
  );
};
