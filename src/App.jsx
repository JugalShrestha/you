import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SearchBar, YouBoard} from "./components";
import {SearchPage, UserPage} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={
          <>
            <SearchBar/> 
            <YouBoard/>
            <SearchPage/>
          </>
        }/>
        <Route path={"/userpage"} element={
          <>
            <SearchBar/>
            <UserPage/>
          </>
          }/>
      </Routes>
    </Router>
  )
}

export default App