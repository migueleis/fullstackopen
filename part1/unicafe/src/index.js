import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const GOOD = "good";
const BAD = "bad";
const NEUTRAL = "neutral";
const TOTAL = "all";
const AVG = "average";
const POS = "positive";

const Button = ({ handeClick, text }) => (
  <button onClick={handeClick}>
    {text}
  </button>
);

const StatisticLine = ({ text, value }) => (
<tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>);

const Statistics = ({ stats }) => {
  return (
    <table>
      <tbody>
          <StatisticLine text={GOOD} value={stats.good} />
          <StatisticLine text={NEUTRAL} value={stats.neutral} />
          <StatisticLine text={BAD} value={stats.bad} />
          <StatisticLine text={TOTAL} value={stats.total} />
          <StatisticLine text={AVG} value={`${stats.avg} %`} />
          <StatisticLine text={POS} value={stats.positive} />
      </tbody>
    </table>
  )
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  useEffect(() => {
    const calculateAVG = (total) => {
      let sum = good - bad;
      if (sum === 0) {
        return 0;
      } else {
        return sum / total;
      }
    };

    const calculatePositive = (total) => {
      let sum = good + neutral;
      if (sum === 0) {
        return 0;
      } else {
        return ((sum / total) * 100);
      }
    };
    let total = good + neutral + bad;
    setAverage(calculateAVG(total));
    setPositive(calculatePositive(total));
    setTotal(good + neutral + bad);
  }, [good, neutral, bad]);

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  const getStatistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    avg: average,
    positive: positive
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button handeClick={handleGood} text={GOOD} />
        <Button handeClick={handleNeutral} text={NEUTRAL} />
        <Button handeClick={handleBad} text={BAD} />
      </div>
      <h2>statistics</h2>

      {total === 0 && "No feedback gievn"}
      {total !== 0 &&
        <Statistics stats={getStatistics} />}
    </div>
  )
}

//From React 18.0.0
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);