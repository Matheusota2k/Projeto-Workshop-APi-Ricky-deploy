import { CardWrapper, NavWrapper } from '../../shared';
import { LinkBackToHome } from '../../components';
import { Card, Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { EpisodeResponse, getEpisodes } from '../../services';
import styles from '../Pages.module.css';

export function Episodes() {
  const [episodes, setEpisodes] = useState<EpisodeResponse[]>([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [showModal, setShowModal] = useState(Array(episodes.length).fill(false));

  useEffect(() => {
    async function fetchData() {
      const data = await getEpisodes(currentNumber);
      setEpisodes(data);
    }
    fetchData();
  }, [currentNumber]);

  const handleNext = () => {
    if (currentNumber < 3) {
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
    const newShowModal = Array(episodes.length).fill(false);
    newShowModal[index] = true;
    setShowModal(newShowModal);
  };

  return (
    <>
      <NavWrapper>
        <LinkBackToHome />
      </NavWrapper>
      <div className={styles.container_cards}>
        {episodes.map((episode, index) => (
          <CardWrapper key={episode.id}>
            <Card.Title>{episode.name}</Card.Title>
            <Card.Text>Data de Estreia: {episode.air_date}</Card.Text>
            <Card.Text>Episodio: {episode.episode}</Card.Text>

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
                  <b>{episode.name}</b>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Card.Text>
                  <b>Data de Estreia:</b> {episode.air_date}
                </Card.Text>
                <Card.Text>
                  <b>Episodio:</b> {episode.episode}
                </Card.Text>
                <Card.Text>
                  <b>Characters in the episode:</b>
                  {episode.characters.map((character, index) => (
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