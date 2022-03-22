import React, { useState, useEffect, useRef } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { api } from '../../services/api';
import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/svg/logo.svg';

interface GitHubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepository[]>(() => {
    const storagedRepos = localStorage.getItem('@GitCollection:repositories');
    return storagedRepos ? JSON.parse(storagedRepos) : [];
  });
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const formEl = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
  }, [repos]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Informe o username/repositório');
      return;
    }

    try {
      const response = await api.get<GitHubRepository>(`repos/${newRepo}`);

      const repository = response.data;

      const newRepoArr = [...repos, repository];
      const arrNames = newRepoArr.map(obj => obj.full_name);
      const filteredRepoArray = newRepoArr.filter(
        ({ full_name }, index) => !arrNames.includes(full_name, index + 1),
      );

      setRepos(filteredRepoArray);
      formEl.current?.reset();
      setNewRepo('');
      setInputError('');
    } catch {
      setInputError('Repositório privado ou inexistente');
    }
  }

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do GitHub</Title>

      <Form
        ref={formEl}
        hasError={Boolean(inputError)}
        onSubmit={handleAddRepo}
      >
        <input
          placeholder="username/repositorie_name"
          value={newRepo}
          onChange={e => handleInputChange(e)}
        />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {repos.map(repository => (
          <Link
            to={`/repositories/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repos>
    </>
  );
};

export default Dashboard;
