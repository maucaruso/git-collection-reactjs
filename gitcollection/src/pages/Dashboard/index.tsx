import React from 'react';

import { Title, Form } from './styles';
import logo from '../../assets/svgs/logo.svg';

export const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do GitHub</Title>

      <Form>
        <input placeholder="username/repositorie_name" />
        <button type="submit">Buscar</button>
      </Form>
    </>
  );
};
