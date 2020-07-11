import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  //Get Repository List from BackEnd by API requests
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO

    //Calling API to POST / CREATE a new Repository
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    //Repository return in response of POST request
    const repository = response.data;

    //Updating Repositories' array with Repository Returned
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO    

    //Calling API to DELETE a Repository
    api.delete(`repositories/${id}`);

    //looking for requested repository on repositories'array
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    //in case of requested repository was found on repositories' array
    if (repositoryIndex > -1) {

      //Updating Repositories' array without Repository Deleted

      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);
    }    

  }

  return (
    <div>
      <ul data-testid="repository-list">
          
          { repositories.map(repository => 
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li> )
          }
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;