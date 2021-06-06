import React, { useState, useEffect, useContext } from 'react';
import { Nav, Navbar, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import Avatar from 'react-avatar';
import memories from '../../images/memories.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import { SearchContext } from '../../contexts/searchContext'

const Navigationbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
      
    <Navbar bg="dark" variant="dark" sticky="top" className={classes.appBar}>
    <Navbar.Brand href="/">Experiences</Navbar.Brand>
    <Nav className="mr-auto"> 
      <Button variant="outline-success" href="/">Home</Button>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => {
             setSearchTerm(e.target.value);
         }}/>
    </Form>
    <Nav className="ml-auto">
      <Avatar size="40" round={true} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
      {user?.result ? (
        <NavDropdown title={user?.result.name} id="basic-nav-dropdown">
          <NavDropdown.Item href="/"onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
        ) : (
          <Nav.Link href="/auth">Login</Nav.Link>
        )}
    </Nav>
  </Navbar>
  
    // <AppBar className={classes.appBar} position="static" color="inherit">
    //   <div className={classes.brandContainer}>
    //     <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Experiences</Typography>
    //     <img className={classes.image} src={memories} alt="icon" height="60" />
    //   </div>
    //   <Toolbar className={classes.toolbar}>
    //     <input type="text" placeholder="search..." onChange={(e) => {
    //         setSearchTerm(e.target.value);
    //     }} />
        // {user?.result ? (
        //   <div className={classes.profile}>
        //     <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
        //     <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
        //     <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
        //   </div>
        // ) : (
        //   <div className={classes.profile}>
        //     <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        //   </div>
        // )}
    //     <Button component={Link} to={user?.result ? "/createForm" : "/auth"} variant="contained" color="primary">Add Experience</Button>
    //   </Toolbar>
    // </AppBar>
  );
};

export default Navigationbar;
