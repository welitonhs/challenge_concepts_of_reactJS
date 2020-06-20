import React, {useState, useEffect} from "react";
import api from './services/api.js';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    (async function loadRepositories(){
      const response = await api.get('/repositories');
      const allRepositories = response.data;
      setRepositories(allRepositories);
    })();
  }, []);

  async function handleAddRepository() {
    const newRepository = await api.post('/repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    setRepositories([...repositories, newRepository.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204){
      const currentRepositories = repositories.filter(repo => repo.id !== id);
      setRepositories(currentRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
