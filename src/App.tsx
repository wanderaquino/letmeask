import {NewRoom} from "./pages/NewRoom";
import {Home} from "./pages/Home";
import {Room} from "./pages/Room";
import {BrowserRouter, Route} from "react-router-dom";
import {AuthContextProvider} from "./contexts/AuthContext"

function App() {
  return (
  <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
        <Route path="/rooms/:id" component={Room}/>
      </AuthContextProvider>
  </BrowserRouter>
  );
}

export default App;
