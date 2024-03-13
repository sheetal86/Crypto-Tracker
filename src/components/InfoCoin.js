import React, { useEffect, useState, useRef } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {Day} from '../config/data'

const InfoCoin = ({ coin }) => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const chartRef = useRef(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setData(data.prices);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [days, currency, coin.id]);

  useEffect(() => {
    const renderChart = () => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
          // Destroy the existing chart instance if it exists
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }

          // Create a new chart instance
          chartRef.current.chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: data.map((res) => {
                let date = new Date(res[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {  // idhr hme red or green me line chahiye
                  data: data.map((res) => res[1]),
                  label: `Price (Past ${days} Days) in ${currency}`,
                  borderColor: data.map((res, index) =>
                    index > 0 && res[1] > data[index - 1][1] ? 'green' : 'red'
                  ),
                 borderWidth:1,
                },
              ],
            },
            options: {
              elements: {
                point: {
                  radius: 3,
                },
              },
            },
          });
        }
      }
    };

    // Delay rendering the chart until the data is available
    renderChart();
  }, [data, days, currency]);

  return (
    <div>
      {data.length === 0 ? (
        <div className='d-flex justify-content-center align-items-center'>
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <canvas ref={chartRef} id="chart" />
      )}
      <div className='d-flex flex-row justify-content-evenly align-items-center mt-3'>{Day.map((day)=>(
        
        <button className=' btn btn-outline-danger' onClick={()=>setDays(day.value)} key={day.value}>
       {day.label}    
    </button>
      ))}</div>
    </div>
  );
};

export default InfoCoin;




