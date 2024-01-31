# CryptoMaster

CryptoMaster is an application for tracking cryptocurrency related data and latest news articles with crypto quiz game.

[Click here for the live site](https://cryptomaster1.herokuapp.com/)

![](https://user-images.githubusercontent.com/32605566/173987251-c729478a-adb2-43fd-9fb4-e025a5cd608b.gif)

## Technologies
- JavaScript
- React
- Redux Toolkit
- Ant Design
- CSS
- Chart.js
- Rapid Api (Coinranking API) and [NewsCatcher News Api](https://newscatcherapi.com/).

## Features

### Home page

#### Users can have an access to the global crypto statistics such as Total Cryptocurrencies, Total Market Capitalization, Total Markets, Total Exchanges, Total 24h Volume as well as Top Ten Cryptocurrencies in the World and latest crypto related news articles.

### Cryptocurrencies
#### Users can pick one of the 100 available cryptocurrencies and choose the desired time frame to track the dynamics of its price history with Chart.js Users have access to the more detailed statistics, cryptocurrency description and supplemental sources. 

![](https://user-images.githubusercontent.com/32605566/173990893-9a88002d-8c09-4251-a59e-e081983a254a.gif)

### News
#### Users can have the access to the general cryptocurrency related news or choose the cryptocurrency they are particularly interested in to get the latest 12 news articles.
![](https://user-images.githubusercontent.com/32605566/173992314-f9013245-47b1-463d-8e11-c456b07055d6.gif)

### CryptoQuiz
#### Users can check their knowledge of cryptocurrencies by playing CryptoQuiz game, inspired by the TV Show "Who Wants To Be A Millionaire?".
![](https://user-images.githubusercontent.com/32605566/173993781-998f4721-1d0e-4c8b-bf3b-9f1d476b63d8.gif)

## Code Snippets
<!-- ![](https://github.com/philsmirnoff/cryptomaster/blob/061674c8f25b3f52c8ce6b77410f0d7914e80359/src/components/LineChart.jsx) -->
```
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  const len = coinHistory?.data?.history?.length;
  const yLen = coinHistory?.data?.history?.length;

  for (let i = len-1; i > 0; i--) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }
  for (let i = yLen-1; i > 0; i--) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString("en-US"));
  }


  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  ```
- Chart is represented by the values pushed into coinPrice and coinTimestamp arrays that we get from looping over data that we got from Coinranking API history end point.
- Coinranking API keeps track of prices on cryptocurrencies. The history endpoint lists prices and their timestamp for the requested time period, useful for making a chart.

```
  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(2000, () =>
        setClassName(a.correct ? "answer correct" : "answer wrong")
        );
   delay(4000, () => {
     if (a.correct) {
       setQuestionNumber((prev) => prev + 1);
       setSelectedAnswer(null);
     } else {
       setStop(true);
     }
   })
  }

```
- The above code responsible for correct and wrong answer logic. If the user clicks on any of four answers, it changes to permanent blue color ```(setClassName: "answer active");```. After 2 seconds, if the answer is correct it turns green ```(setClassName("answer correct")```and user is allowed to solve the next question ```setQuestionNumber((prev) => prev + 1);```. If the user clicks the wrong answer, the answer becomes red ```(setClassName("answer wrong")``` and game stops ```setStop(true);```
 
