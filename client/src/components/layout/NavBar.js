import React, { Fragment } from 'react';
import Image from '../Image'
import { Link } from 'react-router-dom'
import { Box } from 'grommet'
import Button from '../Button'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './navbar.css'
import { logoutUser } from '../../actions'
import { connect } from 'react-redux'



const NavBar = ({ auth: { isAuthenticated, loading }, drawerClickHandler, logoutUser}) => {

 
  const authLinks = (
    <Fragment>

     <div className="navbar-navigation-items">
        <ul>
          <Link to="/dashboard">Home</Link>
          <Link to="/open-tickets">Tickets</Link>
          <Link to="/services">Services</Link>
          <Link to="/clients">Clients</Link>
          <Button buttonText='logout' className="logout-button" onClick={logoutUser}/>
        </ul>

      </div>
      <div className="navbar-toggle-button">
          <DrawerToggleButton click={drawerClickHandler} />
        </div>
    </Fragment>
  )

const logoURL = "https://lh3.googleusercontent.com/Cp1hyyoYe7LOAgEUYzhHlWS6vwbDkhgDPu0MWM3hIFIE10nDaN83lIKEJ-kB-zJrjJZVGBAdFaINlF3oGa4ZMrpB6hJ8SLrz8t-etHG81NKUBp4wF470TGosjM2IbZOd0xZ_Q-mIEXPbJEh6k-4cuTry9iF8yqfvrn8-Fcr3Gj3otF1JKHlhYNfP-W-i58pim2eMEeDiRoqLyS9gHy5BYeexNhzWt6Hee9R8zSN7eGmxeRpD4kvD4zzLsouo92qovo-P_CgwywVh3LH0F2hcOc-_grPbg_dXUb3pPCkgIEnjWkzXw-2Z2Ye5svQGpwyPuJBVWPbLjEdLG4_ZA5GQAnv_xF5bX2btcCnNUYGj3PRltgmvqfD4YaOt7esbJv1kGL5it9xXPw6p1MCQeHys-BOcArMx8TKbyARvHtNDbRJNqMKgaZeSaY46akefA6BSLQQAndljYQC-uU-j85aTaMRHsvp-QrRCYMCau46Xe8Z3MX0fRb-uFm4bGG6xy_MY72sUiFZ7bx28MgRC7QdE9DXXhAoGW2g8sFicvI0fsKcFy5ak0e2a3fZ40lGcOQCilXmKbx38FU3EoEoXgFi3B6c_P9gIxA5_7VNvNn1pF7KjHDR92_ZfWR-2c_JvukHsBvWw76oNQ7jfoX8ARflENE6E1ZHev0U=s858-no"

  return (
     <Box>
    <header className="navbar-container">

        <nav className="navbar-navigation">
        
          <div className="company-logo">

            <Link to="/dashboard"><Image source={logoURL} /></Link>
          </div>

          <div className="spacer" />
         { !loading && <Fragment>{isAuthenticated && authLinks}</Fragment>}
        </nav>
        
    </header>
    </Box>
       
          
  
  
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logoutUser })(NavBar)
