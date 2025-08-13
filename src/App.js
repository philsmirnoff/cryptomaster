import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import News from "./components/News";
import CryptoDetails from "./components/CryptoDetails";
import CryptoQuiz from "./components/CryptoQuiz";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <ScrollToTop />
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/cryptoquiz">
                <CryptoQuiz />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            CryptoMaster <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/news">News</Link>
            <Link to="/cryptoquiz">CryptoQuiz</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
