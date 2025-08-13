import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

// Custom Image component with fallback
const ImageWithFallback = ({ src, fallback, alt, style, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  
  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
      console.log('Image failed to load, using fallback:', fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={style}
      onError={handleError}
      {...props}
    />
  );
};

// Custom Avatar component with fallback
const AvatarWithFallback = ({ src, fallback, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  
  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
      console.log('Avatar failed to load, using fallback:', fallback);
    }
  };

  return (
    <Avatar
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const demoImage = "/coin.jpg"

  // Debug logging
  if (cryptoNews?.value) {
    console.log('News data:', cryptoNews.value);
    console.log('First news item image:', cryptoNews.value[0]?.image);
    console.log('Demo image path:', demoImage);
  }


if (!cryptoNews?.value) return <Loader />;

  return (
    <div className="news-container">
      <div className="news-content">
        {!simplified && (
          <div style={{ padding: "20px 20px 0 20px" }}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins?.map((coin) => (
                <Option key={coin.id} value={coin.name}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </div>
        )}
        <div className="news-grid">
          <Row gutter={[24, 24]} style={{ padding: "20px", flex: 1 }}>
            {cryptoNews.value.map((news, i) => (
              <Col xs={24} sm={12} lg={8} key={i} style={{ display: 'flex' }}>
                <Card hoverable className="news-card" style={{ width: '100%' }}>
                  <a href={news.url} target="_blank" rel="noreferrer">
                    <div className="news-image-container">
                      <Title className="news-title" level={4}>
                        {news.name}
                      </Title>
                      <ImageWithFallback
                        src={
                          news.image?.thumbnail?.contentUrl || 
                          news.image?.contentUrl || 
                          news.image?.url || 
                          demoImage
                        }
                        fallback={demoImage}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <p>
                      {news.description.length > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description}
                    </p>
                    <div className="provider-container">
                      <div>
                        <AvatarWithFallback
                          src={
                            news.provider[0]?.image?.thumbnail?.contentUrl ||
                            news.provider[0]?.image?.contentUrl ||
                            news.provider[0]?.image?.url ||
                            demoImage
                          }
                          fallback={demoImage}
                          alt=""
                        />
                        <Text className="provider-name">
                          {news.provider[0]?.name}
                        </Text>
                      </div>
                      <Text>
                        {moment(news.datePublished).startOf("ss").fromNow()}
                      </Text>
                    </div>
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default News;
