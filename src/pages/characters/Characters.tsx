import { CardWrapper, NavWrapper } from '../../shared';
import { LinkBackToHome } from '../../components';
import { Card, Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { CharacterResponse, getCharacters } from '../../services';
import styles from '../Pages.module.css';

export function Characters() {
  const [characters, setCharacters] = useState<CharacterResponse[]>([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [showModal, setShowModal] = useState(Array(characters.length).fill(false));

  useEffect(() => {
    async function fetchData() {
      const data = await getCharacters(currentNumber);
      setCharacters(data);
    }
    fetchData();
  }, [currentNumber]);

  const handleNext = () => {
    if (currentNumber < 42) {
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
    const newShowModal = Array(characters.length).fill(false);
    newShowModal[index] = true; // Defina true apenas para o índice atual
    setShowModal(newShowModal);
  };

  return (
    <>
      <NavWrapper>
        <LinkBackToHome />
      </NavWrapper>
      <div className={styles.container_cards}>
        {characters.map((character, index) => (
          <CardWrapper key={character.id}>
            <Card.Img variant='top' src={character.image} />
            <Card.Title>{character.name}</Card.Title>
            <Card.Text>
              <b>Status:</b> {character.status}
            </Card.Text>
            <Card.Text>
              <b>Species:</b> {character.species}
            </Card.Text>
            <Card.Text>
              <b>Location:</b> {character.location.name}
            </Card.Text>

            <Button variant='primary' onClick={() => handleShowModal(index)}>
              Show Details
            </Button>

            <Modal
              show={showModal[index]} // Use o estado correspondente ao índice atual
              onHide={() =>
                setShowModal((prevState) => {
                  const newState = [...prevState];
                  newState[index] = false; // Feche o modal correspondente ao índice atual
                  return newState;
                })
              }
              dialogClassName='modal-90w'
              aria-labelledby='example-custom-modal-styling-title'
            >
              <Modal.Header closeButton>
                <Modal.Title id='example-custom-modal-styling-title'>
                  <b>{character.name}</b>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Card.Img variant='top' src={character.image} />
                <Card.Text>
                  <b>Status:</b> {character.status}
                </Card.Text>
                <Card.Text>
                  <b>Species:</b> {character.species}
                </Card.Text>
                <Card.Text>
                  <b>Location:</b> {character.location.name}
                </Card.Text>
                <Card.Text>
                  <b>Origin:</b> {character.origin.name}
                </Card.Text>
                <Card.Text>
                  <b>Link to character episodes:</b>
                  {character.episode.map((episode) => (
                    <Card.Text key={episode}>
                      <a href={episode}>{episode}</a>
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