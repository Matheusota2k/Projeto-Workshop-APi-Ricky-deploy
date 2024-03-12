import { Card } from 'react-bootstrap';
import style from './cardWrapper.module.css';

export function CardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Card className={style.container_card}>
      <Card.Body className={style.content_card}>{children}</Card.Body>
    </Card>
  );
  }