import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import About from "./components/pages/About";
import Demo from "./components/pages/Demo";
import NoMatch from "./components/pages/NoMatch";
import AddUsers from "./components/users/AddUsers";
import EditUser from "./components/users/EditUser";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route exact path="/faq">
          <About />
        </Route>
        <Route exact path="/contact">
          <Demo />
          {/* <Contact /> */}
        </Route>
        <Route exact path="/user/add">
          <AddUsers />
        </Route>
        <Route exact path="/faq/edit/:id">
          <EditUser />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
