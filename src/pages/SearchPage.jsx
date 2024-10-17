// import YouCard from "../components/YouCard"; // Ensure this is correctly imported
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { YouCard } from '../components';

const SearchPage = () => {
  const [data, setData] = useState([]); // Ensure this is always an array

  // Function to fetch data
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "you_sers"));
      const fetchedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(fetchedData); // Set fetched data
    } catch (error) {
      console.error("Error fetching data: ", error);
     }
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="search-page">
      {data.map((item,index) => (
        <YouCard key={index} rank={item.rank} name={item.name}/>
        ))
      }
    </div>
  );
}

export default SearchPage;
