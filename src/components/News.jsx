import React, { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import ImageWithFallback from "./ImageWithFallback";
import AvatarWithFallback from "./AvatarWithFallback";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified, showAllNews = false }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? (showAllNews ? 10 : 6) : 12,
  });
  const demoImage = "/coin.jpg"

  // Reset showAllNews when newsCategory changes (only for full news page)
  useEffect(() => {
    if (!simplified) {
      // Reset logic for full news page if needed
    }
  }, [newsCategory, simplified]);

  if (!cryptoNews?.value) return <Loader />;

  const displayedNews = simplified && !showAllNews ? cryptoNews.value.slice(0, 6) : cryptoNews.value;

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
            {displayedNews.map((news, i) => {
              // Calculate if this is the last item and how many items are in the last row
              const totalItems = displayedNews.length;
              const itemsPerRow = 3; // lg={8} means 3 items per row on large screens
              const lastRowItems = totalItems % itemsPerRow;
              const isLastRow = i >= totalItems - lastRowItems;
              const isLastItem = i === totalItems - 1;
              
              // Center the last row items (only on large screens)
              let colProps = { xs: 24, sm: 12, lg: 8 };
              let colStyle = { display: 'flex' };
              
              // Only apply centering on large screens (lg and above)
              if (isLastRow && lastRowItems === 1) {
                // Single item in last row - center it (desktop only)
                colProps = { xs: 24, sm: 12, lg: 8, lg: { span: 8, offset: 8 } };
              } else if (isLastRow && lastRowItems === 2) {
                // Two items in last row - center them (desktop only)
                colProps = { xs: 24, sm: 12, lg: 8 };
                if (i === totalItems - 2) {
                  colProps.lg = { span: 8, offset: 4 }; // First of two items
                }
              }
              
              return (
                <Col key={i} {...colProps} style={colStyle}>
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
                        {news.description.length > 200
                          ? `${news.description.substring(0, 200)}...`
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
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default News;
