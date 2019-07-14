
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image } from 'react-bootstrap'

function App() {
  const [data, setData] = useState(null);
  const [url] = useState(
    'https://api.myjson.com/bins/h04wf',
  );
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

  return (
    <Container>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <Row>
          <Col>Loading ...</Col>
        </Row>
      ) : (
          <Fragment>
            {data ?
            <Fragment>
              <Row>
                <Col sm={3}>
                  Investorů: {data.investmentsCount}
                </Col>
                <Col sm={3}>
                  Investováno: {data.amount - data.remainingInvestment}&nbsp;Kč
                </Col>
                <Col sm={3}>
                  Roční úrok: {data.interestRate * 100}&nbsp;%
                </Col>
                <Col sm={3}>
                  Rating: {data.rating}
                </Col>
                <Col>Výše splátky: {data.annuity}&nbsp;Kč/měs.</Col>
              </Row>
              <Row>
                <Col sm={4} key={data.id}>
                  <Image src={`https://app.zonky.cz/api${data.photos[0].url}`} thumbnail />
                </Col>
                <Col sm={8}>
                  <h4>{data.name}</h4>
                  <h6>{data.nickName}</h6>
                  <div>{data.mainIncomeType}</div>
                  <div>{data.story}</div>
                </Col>
              </Row>
            </Fragment>
              : null}
          </Fragment>
        )}
    </Container>
  );
}

export default App;