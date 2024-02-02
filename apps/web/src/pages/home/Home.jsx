import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/sample`,
      );
      setSampleData(data);
    })();
  }, []);

  return (
    <>
      <div className="flex w-max gap-4">
      </div>
      {sampleData.map((data, idx) => (
        <div key={idx.toString()}>{data.name}</div>
      ))}
    </>
  );
}

export default Home;
