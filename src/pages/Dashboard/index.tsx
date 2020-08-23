import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './style';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');
    if(storagedRepositories){
      return JSON.parse(storagedRepositories);
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);
  async function handleAddRepository(e: FormEvent<HTMLFormElement>): Promise<void>{
    e.preventDefault();

    if(!input){
      setInputError('Digite o autor/nome do repositório');
      return;
    }
    try {
      const response = await api.get<Repository>(`repos/${input}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setInput('');
      setInputError('');
    } catch (error) {
      setInputError('Erro na busca pelo repositório');
    }
  }
  return (
      <>
        <img src={logoImg} alt="GitHub Explorer" />
        <Title>Explore repositórios no GitHub</Title>
        <Form hasError={!!inputError} onSubmit={handleAddRepository}>
          <input
            placeholder="Digite o nome do repositório"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
          <button type="submit">Pesquisar</button>
        </Form>

        {inputError && <Error>{inputError}</Error>}


        <Repositories>
          {repositories.map(repo => {
            return (
              <Link key={repo.full_name} to={`/repository/${repo.full_name}`}>
                <img
                  alt={repo.owner.login}
                  src={repo.owner.avatar_url}
                />
                <div>
                  <strong>{repo.full_name}</strong>
                  <p>{repo.description}</p>
                </div>
                <FiChevronRight size={20} />
              </Link>
            );
          })}
        </Repositories>
      </>
);
}
export default Dashboard;
