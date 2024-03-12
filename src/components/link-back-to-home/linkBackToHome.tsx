import { ArrowLeft } from 'phosphor-react';
import { Nav } from 'react-bootstrap';

export function LinkBackToHome() {
  return (
    <div>
      <Nav.Link href='/'>
        <ArrowLeft size={20} />
      </Nav.Link>
    </div>
  );
}