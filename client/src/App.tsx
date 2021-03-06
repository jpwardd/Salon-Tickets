import React, { useEffect, useState } from 'react';
import './components/layout/navbar.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard/Dashboard'
import Services from './pages/Services/Services'
import { Provider } from 'react-redux'
import { loadUser} from '../src/actions'

import NavBar from './components/layout/NavBar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop'
import PrivateRoute from './components/routing/PrivateRoute'
import AddNewService from './pages/Services/AddNewService'
import CreateTicket from './pages/Tickets/CreateTicket'
import CreateEmployees from './pages/Employees/CreateEmployees'
import './App.css'

import Tickets from './pages/Tickets/Tickets';
import CreateClient from './pages/Clients/CreateClient';
import Clients from './pages/Clients/Clients';
import store from './store/store';



const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  const [toggle, setToggle] = useState(false)

  const drawerToggle = (): void => {
    setToggle(!toggle)
  }

  let backdrop;
  if (toggle) {
    backdrop = <Backdrop click={drawerToggle} />
  }

  return (
    <Provider store={store}>
      <Router>
        <div style={{ marginBottom: "100px" }}>
          <NavBar drawerClickHandler={drawerToggle} />
          <SideDrawer show={toggle} />
          {backdrop}
        </div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/services" component={Services} />
          <PrivateRoute exact path="/services/new" component={AddNewService} />
          <PrivateRoute exact path="/employee/new" component={CreateEmployees} />
          <PrivateRoute exact path="/open-tickets" component={Tickets} />
          <PrivateRoute exact path="/tickets/create" component={CreateTicket} />
          <PrivateRoute exact path="/clients" component={Clients} />
          <PrivateRoute exact path="/clients/new" component={CreateClient} />
        </Switch>
      </Router>
    </Provider>
  )
}


export default App;
