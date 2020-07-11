import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  //Get Repository List from BackEnd by API requests
  console.log(`USE EFFECT: - `);
  useEffect(() => {
    api.get('repositories').then(response => {
//      // console.log(`RESPONSE: -> [${response.data[0]}]`);
//      // console.log(`RESPONSE: -> [${response.data.title}]`);
//      console.log(`RESPONSE: - `);
//      console.log(`RESPONSE: - [${response.data}]`);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    console.log(`handleAddRepository - `);

    //Calling API to POST / CREATE a new Repository
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    //Repository return in response of POST request
    const repository = response.data;

    //Updating Repositories'array with Repository Returned
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log(`handleRemoveRepository - id :[${id}]`);

    console.log(`repositories size: [${repositories.length}]`);
    
    console.log(`repositories id:    [${repositories[0].id}]`);
    console.log(`repositories url:   [${repositories[0].url}]`);
    console.log(`repositories title: [${repositories[0].title}]`);
    console.log(`repositories techs: [${repositories[0].techs}]`);
    
    // console.log(`repositories id:    [${repositories[1].id}]`);
    // console.log(`repositories url:   [${repositories[1].url}]`);
    // console.log(`repositories title: [${repositories[1].title}]`);
    // console.log(`repositories techs: [${repositories[1].techs}]`);
    

    //looking for requested repository on repositories'array
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    console.log(`repositories INDEX:    [${repositoryIndex}]`);

    //in case of requested repository wasn't found on repositories'array
    if (repositoryIndex > -1) {

      console.log(`DENTRO DO IF - repositoryIndex > `);

      repositories.splice(repositoryIndex, 1);

      // setRepositories(repositories);
      // setRepositories([]);
      setRepositories([...repositories]);
    }


    //Calling API to POST / CREATE a new Repository
    // const response = await 
    console.log(`api.delete(repositories/${id})`);
    api.delete(`repositories/${id}`);

    console.log(`repositories size: [${repositories.length}]`);

    // setRepositories(repositories);
//    setRepositories([]);

    console.log(`repositories size: [${repositories.length}]`);



    // if (repositories.length > 0) {
    //   // repositories.splice((id - 1), 1);
    //   repositories.splice(0, 1);
  
    //   console.log(`repositories size: [${repositories.length}]`);
      
    //   setRepositories(repositories);
    // }

    //Repository return in response of POST request
    // const repository = response.data;

    //Updating Repositories'array with Repository Returned
    // setRepositories([...repositories, repository]);

    //
    // setRepositories(repositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
          
          { repositories.map(repository => 
              <li key={repository.id}>
                {repository.title}
                {/* {repository.id} */}
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