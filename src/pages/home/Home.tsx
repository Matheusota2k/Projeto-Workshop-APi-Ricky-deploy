import styles from './Home.module.css';
import { NavWrapper } from '../../shared';
import { Nav } from 'react-bootstrap';

export function Home() {
  return (
    <>
      <NavWrapper>
        <Nav.Link href='/characters'>Characters</Nav.Link>
        <Nav.Link href='/episodes'>Episodes</Nav.Link>
        <Nav.Link href='/locations'>Locations</Nav.Link>
      </NavWrapper>
      <div className={styles.background_image} />
    </>
  );
}