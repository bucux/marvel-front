
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./comps/pages/login";
import Signup from "./comps/pages/signup";
import { useStoreBool } from "./stores/storeBool";
import Middle from "./comps/sections/middle";
import Header1 from "./comps/sections/header1";
import Comics from "./comps/pages/comics";
import Comic from "./comps/pages/comic";
import Characters from "./comps/pages/characters";
import Character from "./comps/pages/character";
import Favorites from "./comps/pages/favorites";
import Logout from "./comps/pages/logout";

function App() { // les services (handshake, local storage, variables d'environnemnt) sont assurés par le composant <Middle/> qui est un middleware réactif
  
  const isLoginOpened = useStoreBool(state=>state.isLoginOpened)
  const isLogoutOpened = useStoreBool(state=>state.isLogoutOpened)
  const isSignupOpened = useStoreBool(state=>state.isSignupOpened)

  return (
    <Router>
      <Header1/>
      <Middle/> 
      <Routes>
        <Route path="/" element={<Navigate replace to="/characters" />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic" element={<Comic />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character" element={<Character />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Navigate to="/characters" />} />
      </Routes>
      {isLoginOpened ? <Login/> : null}
      {isLogoutOpened ? <Logout/> : null}
      {isSignupOpened ? <Signup/> : null}
    </Router>
  )
}

export default App;