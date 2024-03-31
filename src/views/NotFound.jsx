import { Button, Container, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <>
      <Container className='text-center col-12 pt-5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src='../public/error-404-4279234-3569464.webp' alt='404' style={{ width: '400px' }} />
        <h1 className='mb-4 text-dark'>La ruta que intentas consultar no existe :/</h1>
        <Spinner animation='border" role="status'>
          <span className='visually-hidden'>Cargando Pizza...</span>
        </Spinner>
        <Button className='btn btn-warning' onClick={handleClick}><strong>Volver al Home</strong></Button>
      </Container>
    </>
  )
}

export default NotFound
