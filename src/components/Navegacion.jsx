import { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { PizzasContext } from '../context/PizzasContext'

const Navegacion = () => {
  const { totalPizzas } = useContext(PizzasContext)
  const validateRoot = ({ isActive }) => isActive ? 'menu active' : 'menu'
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <>
      <Navbar expand='lg' className='nav'>
        <Container>
          <Navbar.Brand onClick={handleClick}><NavLink to='/' className={`navbar ${validateRoot}`}>🍕Pizzería Mamma Mia!</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <NavLink to='/carrito' className={`navbar ${validateRoot}`}><h5 style={{ margin: '0' }}>🛒${totalPizzas}</h5></NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navegacion
