import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Form } from 'react-bootstrap'
import { Link } from '@reach/router';

  const useDataApi = (initialUrl) => {
    const [data, setData] = useState([]);
    // const url = 'https://api.zonky.cz/loans/marketplace';

    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
          const result = await axios(url);
          setData(result.data);

        } catch (error) {
          setIsError(true);
        }

        setIsLoading(false);
      };

      fetchData();
    }, [url]);

    return [{ data, isLoading, isError }, setUrl];
  };

  function App() {
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
      'https://api.myjson.com/bins/xazfz'
    );

    const TrimText = (props) => {
      let content = props.text.split(' ').slice(0, 20);
      content = content.join(' ');
  
      if (content.length >= 200) {
        content = content.substring(0, 200) + '...';
      }
  
      return <div>{content}</div>
  
    }

  return (
    <Container>
      <Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Roční úrok </Form.Label>
          <Form.Control as="select" onChange={event => {
            doFetch('https://api.myjson.com/bins/185i33')
          }}>
            <option value="">nezáleží</option>
            <option value="AAAAAA">2,99%</option>
            <option value="AAAAA">3,99%</option>
            <option value="AAAA">4,99%</option>
            <option value="AAA">5,99%</option>
            <option value="AAE">6,99%</option>
            <option value="AA">8,49%</option>
            <option value="AE">9,49%</option>
            <option value="A">10,99%</option>
            <option value="B">13,49%</option>
            <option value="C">15,49%</option>
            <option value="D">19,99%</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="">
          <Form.Label>Délka splácení </Form.Label>
          <Form.Control as="select">
            <option value="">
              nezáleží
          </option>
            <option value="0-12">
              do 12 měsíců
          </option>
            <option value="12-36">
              1 - 3 roky
          </option>
            <option value="36-60">
              3 - 5 let
          </option>
            <option value="60-84">
              5 - 7 let
          </option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="">
          <Form.Label>Pojištění </Form.Label>
          <Form.Control as="select">
            <option value="">
              nezáleží
          </option>
            <option value="insurance-active">
              jen pojištěné
          </option>
            <option value="insurance-inactive">
              jen nepojištěné
          </option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="">
          <Form.Label>Řazení podle úroku</Form.Label>
          <Form.Control as="select">
            <option value="">
              výchozí
          </option>
            <option value="covered,interestRate">
              od nejnižšího
          </option>
            <option value="covered,-interestRate">
              od nejvyššího
          </option>
          </Form.Control>
        </Form.Group>
      </Row>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <Row>
          <Col>Loading ...</Col>
        </Row>
      ) : (
          <Row>
            {data.map(item => (
              <Col sm={4} key={item.id}>
                <Image src={`https://app.zonky.cz/api${item.photos[0].url}`} thumbnail />
                {item.name}
                <TrimText text={item.story} />
                <Link to={`loan/${item.id}`}>Detail</Link>
              </Col>
            ))}
          </Row>
        )}
    </Container>
  );
}

export default App;