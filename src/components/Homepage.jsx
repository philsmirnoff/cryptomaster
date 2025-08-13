import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';


const { Title } = Typography;


const Homepage = () => {
  const [showAllNews, setShowAllNews] = useState(false);
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if(isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className='heading' style={{ padding: "20px" }}>Global Crypto Stats</Title>
      <Row style={{ padding: "20px" }}>
        <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats?.total} /></Col>
        <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title='Total Market Cap:' value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
        <Col span={12}><Statistic title='Total 24h Volume' value={`$${millify(globalStats.total24hVolume)}`} /></Col>
        <Col span={12}><Statistic title='Total Markets' value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container" style={{ padding: "20px" }}>
        <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container" style={{ padding: "20px" }}>
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more">
          {showAllNews ? (
            <Link to="/news">View All News</Link>
          ) : (
            <span 
              onClick={() => setShowAllNews(true)} 
              style={{ cursor: 'pointer', color: '#0071bd' }}
            >
              Show more
            </span>
          )}
        </Title>
      </div>
      <News simplified showAllNews={showAllNews} />
    </>
  )
}

export default Homepage
