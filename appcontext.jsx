import { createContext, useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { PropTypes } from "prop-types";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to fetch data
  const fetchData = async () => {
    try {
      // Query to get users sorted by like_count in descending order
      const usersCollection = collection(db, "you_sers");
      const usersQuery = query(usersCollection, orderBy("joined"));
      const querySnapshot = await getDocs(usersQuery);

      const fetchedData = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        rank: index + 1, // Add rank based on like_count ordering
      }));

      setData(fetchedData);
      return fetchedData; // Return fetched data for further use
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    // Fetch all users' data when component mounts
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);

        // Fetch user document data
        const userDoc = await getDoc(doc(db, "you_sers", user.uid));
        const userInfo = { uid: user.uid, email: user.email, ...userDoc.data() };

        // Fetch rank from the fetched data
        const fetchedData = await fetchData(); // Fetch the latest data
        const matchedUser = fetchedData.find((u) => u.id === user.uid); // Find the current user

        if (matchedUser) {
          userInfo.rank = matchedUser.rank; // Add rank to userData
        }

        setUserData(userInfo); // Set userData with rank
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, setData, data }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
