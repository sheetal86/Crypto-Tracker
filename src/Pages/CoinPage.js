import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import InfoCoin from '../components/InfoCoin';
import { numCommas } from '../components/Banner/Carousel';
function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchcoin = async () => {
     let {data}= await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
     setCoin(data);
  };
useEffect(()=>{
    fetchcoin()
},[currency])
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 d-flex flex-column justify-content-center align-items-center">
            {!coin?(<div className='d-flex justify-content-center align-items-center'>
                <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
                 </div>
                 </div>) :( 
              <>
                <img
                  src={coin.image.large}
                  alt={coin.name}
                  height="150"
                  width="150"
                  style={{ marginBottom: 20 }}
                />
                <h3>{coin.name}</h3>
                {/* here reacthtmlparser is used to display description only in eng language */}
                {/* is ko chalane ke liye mujhe npm install buffer krna pda hai */}
                <p className='text-center'>{ReactHtmlParser(coin.description.en.split(". ")[0])}</p>
                <h4>Rank : {coin.market_cap_rank}</h4>
                <h4>
                  Current Price : {symbol}{" "}
                  {numCommas(coin.market_data.current_price[currency.toLowerCase()])}
                </h4>
                <h4>
                  Market Cap : {symbol}{" "}
                  {numCommas(
                    coin.market_data.market_cap[currency.toLowerCase()].toString()
                  )}
                </h4>
              </>
            )}
          </div>
          <div className="col-8">
          {coin ? (   // adding this functionality because if we did't got coin then it will cause error in next file
          <InfoCoin coin={coin} />
           ) : (
          <p>Loading...</p>
          )}
            </div>
        </div>
      </div>
    );
    
 
  
}

export default CoinPage;
