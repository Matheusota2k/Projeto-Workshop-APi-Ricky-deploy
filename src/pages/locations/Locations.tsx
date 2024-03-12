import { CardWrapper, NavWrapper } from '../../shared';
import { LinkBackToHome } from '../../components';
import { Card, Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { LocationResponse, getLocations } from '../../services';
import styles from '../Pages.module.css';

export function Locations() {
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [showModal, setShowModal] = useState(Array(locations.length).fill(false));

  useEffect(() => {
    async function fetchData() {
      const data = await getLocations(currentNumber);
      setLocations(data);
    }
    fetchData();
  }, [currentNumber]);

  const handleNext = () => {
    if (currentNumber < 7) {
      setCurrentNumber(currentNumber + 1);
      console.log(currentNumber + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentNumber > 1) {
      setCurrentNumber(currentNumber - 1);
      console.log(currentNumber - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleShowModal = (index: number) => {
    const newShowModal = Array(locations.length).fill(false);
    newShowModal[index] = true;
    setShowModal(newShowModal);
  };

  return (
    <>
      <NavWrapper>
        <LinkBackToHome />
      </NavWrapper>
      <div className={styles.container_cards}>
        {locations.map((location, index) => (
          <CardWrapper key={location.id}>
            <Card.Title>{location.name}</Card.Title>
            <Card.Text>Type: {location.type}</Card.Text>
            <Card.Text>Dimension: {location.dimension}</Card.Text>

            <Button variant='primary' onClick={() => handleShowModal(index)}>
              Show Details
            </Button>

            <Modal
              show={showModal[index]}
              onHide={() =>
                setShowModal((prevState) => {
                  const newState = [...prevState];
                  newState[index] = false;
                  return newState;
                })
              }
              dialogClassName='modal-90w'
              aria-labelledby='example-custom-modal-styling-title'
            >
              <Modal.Header closeButton>
                <Modal.Title id='example-custom-modal-styling-title'>
                  <b>{location.name}</b>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Card.Text>Type: {location.type}</Card.Text>
                <Card.Text>Dimension: {location.dimension}</Card.Text>
                <Card.Text>
                  <b>Characters residents:</b>
                  {location.residents.map((character, index) => (
                    <Card.Text key={index}>
                      <a href={character}>{character}</a>
                    </Card.Text>
                  ))}
                </Card.Text>
              </Modal.Body>
            </Modal>
          </CardWrapper>
        ))}
      </div>
      <div className={styles.container_buttons_prev_next}>
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </>
  );
}