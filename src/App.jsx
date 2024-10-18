import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SearchBar,GoBackBtnUserPage, YouBoard} from "./components";
import {LoginPage, SearchPage, UserPage} from "./pages";
import { AppProvider } from "../appcontext";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path={"/"} element={
            <>
              <SearchBar/> 
              <YouBoard/>
              <SearchPage/>
            </>
          }/>
          <Route path={"/detail/:id"} element={
            <>
              <SearchBar/>
              <YouBoard/>
              <UserPage/>
            </>
            }/>
            <Route path={'/search'} element={
              <>
                <SearchBar/>
                <YouBoard/>
                <SearchPage/>
              </>
            }/>
            <Route path="/login" element={
              <>
                <GoBackBtnUserPage/>
                <YouBoard/>
                <LoginPage/>
              </>
            }/>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App