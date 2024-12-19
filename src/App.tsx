import { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // getGitHubData();
  }, []);

  const getGitHubData = async () => {
    const response = await fetch(`https://api.github.com/users`);
    const data = await response.json();
    console.log(data);

    setData(data);
  };

  return (
    <section>
      <h1>Hello</h1>
      <FontAwesomeIcon icon={faUser} />
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>
            <img src={item.avatar_url} alt={item.login} width={100} />
            <h3>{item.login}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
