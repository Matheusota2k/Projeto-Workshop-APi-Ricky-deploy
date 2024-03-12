import { Container, Nav, Navbar } from 'react-bootstrap';

// templates com children
export const NavWrapper = ({ children }: { children: React.ReactNode }) => (
  <Navbar expand='lg' className='bg-body-tertiary'>
    <Container>
      <Navbar.Brand href='#home'>Rick and Morty World</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>{children}</Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);