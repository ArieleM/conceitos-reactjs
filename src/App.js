import React, {useEffect, useState} from "react";
import api from  './services/api'

import "./styles.css";

function App() {
  const [respositories, setRespositories] = useState([])
  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRespositories(response.data);
    })
  },[])
  async function handleAddRepository() {
    // TODO
    const response =  await api.post('repositories', {
      title:`Desafio ReactJS`,
      url: 'https://github.com/ArieleM', 
      techs: ['Node.js', 'ReactJS']
    })
    setRespositories([...respositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRespositories(respositories.filter(
      repository => repository.id !== id
    ));
    console.log(respositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map( repository =>(
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
