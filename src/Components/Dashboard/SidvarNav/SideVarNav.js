
import React, { useContext, useEffect, useState } from 'react';
import { Col, Nav, Tab } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faPlusCircle, faHome,faBars, faTasks,faUserCircle,faShoppingBag, faShoppingCart,faUserPlus, faUsers,faSearchDollar } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import "./sidBarNav.css"

const SideVarNav = () => {


  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch('https://morning-thicket-61908.herokuapp.com/isAdmin', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: loggedInUser.email })
      })
          .then(res => res.json())
          .then(data => {
              setLoading(false)
              setIsAdmin(data)
          }
          )
  }, [])



  return (

    <Tab.Container id="left-tabs-example" defaultActiveKey="first">

      <Col >
        <Nav variant="pills" className="flex-column nav-container ">
          <Nav.Item>
            <Link      to="/dashboard/Profile">  <FontAwesomeIcon icon={faUserCircle} /> Profile</Link>
          </Nav.Item>
          
     
          <Nav.Item>
            <Link      to="/dashboard/addProduct"><FontAwesomeIcon icon={faPlusCircle} /> Add product</Link>
          </Nav.Item>
          <Nav.Item>
            <Link      to="/dashboard/MakeAdmin"><FontAwesomeIcon icon={faPlusCircle} /> make admin</Link>
          </Nav.Item>
         
          <Nav.Item>
            {/* <Link      to="/dashboard/manageService"><FontAwesomeIcon icon={faTasks} /> Manage products</Link> */}
          </Nav.Item>

        
         

        </Nav>
      </Col>

    </Tab.Container>
  );
};

export default SideVarNav;