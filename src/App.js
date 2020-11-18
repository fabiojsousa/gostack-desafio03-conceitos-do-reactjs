import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const newRepo = {
      title: `This is a new repo created at ${Date.now()}`,
      url: `https://github.com/fabiojsousa`,
      techs: ["NodeJs", "ReactJs", "JavaScript"],
    };

    const { data } = await api.post("repositories", newRepo);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const indexToDelete = repositories.findIndex((repo) => id === repo.id);

      if (indexToDelete !== -1) {
        const updatedRepositories = [...repositories];

        updatedRepositories.splice(indexToDelete, 1);

        setRepositories(updatedRepositories);
      }
    });
  }

  useEffect(() => {
    api.get("repositories").then((response) => {
      const { data } = response;

      setRepositories(data);
    });
  }, []);

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            <div>
              <p>
                <strong>ID: </strong>
                <span>{repo.id}</span>
              </p>
              <p>
                <strong>Title: </strong>
                <span>{repo.title}</span>
              </p>
              <p>
                <strong>URL: </strong>
                <span>{repo.url}</span>
              </p>
              <p>
                <strong>Techs: </strong>
                <span>{repo.techs}</span>
              </p>
            </div>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
