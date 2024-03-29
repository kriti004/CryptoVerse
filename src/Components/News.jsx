import React from "react";

import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";
import { useGetNewsQuery } from "../Services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = (simplified) => {
  const { data, isFetching } = useGetNewsQuery({
    newsCategory: "cryptocurrency",
    count: simplified ? 6 : 10,
  });
  console.log(data);
  if (isFetching) return "Loading...";

  const makeImageSafe = (link) => {
    const linkAsString = String(link);
    return linkAsString.replace(/^http:\/\//i, "https://");
  };

  return (
    <Row gutter={[24, 24]}>
      {data && data.value && data.value.map((news, i) => (
  <Col xs={24} sm={12} lg={8} key={i}>
    {news && ( // Add this check
      <Card hoverable className="news-card">
        {/* ... rest of your code ... */
         <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={
                    makeImageSafe(news?.image?.thumbnail?.contentUrl) ??
                    demoImage
                  }
                  alt="News"
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="News"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>}
      </Card>
    )}
  </Col>
))}
     
    </Row>
  );
};

export default News;
