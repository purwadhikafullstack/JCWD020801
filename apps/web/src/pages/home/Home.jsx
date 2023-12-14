import { useEffect, useState } from 'react';
import axios from 'axios';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Button, Checkbox, Menu,
  MenuHandler,
  MenuList,
  MenuItem } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

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
        <Link to={'/login-admin'}>
        <Button variant="filled">Login Admin</Button>
        </Link>
        <Button variant="gradient">gradient</Button>
        <Button variant="outlined">outlined</Button>
        <Button variant="text">text</Button>  
      </div>
      {sampleData.map((data, idx) => (
        <div key={idx.toString()}>{data.name}</div>
      ))}
    </>
  );
}

export default Home;
