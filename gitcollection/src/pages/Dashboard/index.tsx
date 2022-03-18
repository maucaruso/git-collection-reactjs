import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repos } from './styles';
import logo from '../../assets/svg/logo.svg';
import repoImg from '../../assets/img/repo-img.jpg';

export const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do GitHub</Title>

      <Form>
        <input placeholder="username/repositorie_name" />
        <button type="submit">Buscar</button>
      </Form>

      <Repos>
        <a href="/repositories">
          <img src={repoImg} alt="Repositório" />
          <div>
            <strong>maurici3/php7-udemy</strong>
            <p>Repósitorio do curso de PHP Udemy</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  );
};
