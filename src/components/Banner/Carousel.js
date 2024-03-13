import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext'
// import { TrendingCoins } from '../../config/api';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';   // this is imported using npm (no file created)
import { NavLink } from 'react-router-dom';

// this is used to display coin price in (10,00,000) this comma format
export function numCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}
const Carousel = () => {
    const [trending,setTrending] = useState([]);
    const {currency , symbol} = CryptoState();

    const trendcoin =async ()=>{
        const currency_1=currency;
        const {data}= await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency_1}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
        //TrendingCoins(currency)
        setTrending(data);
    }
    // console.log(trending);
    const items = trending.map((coin)=>{
        // to show profit behind the images
        let profit = coin.price_change_percentage_24h >= 0 ;  // taking this from console.log(trending);

         return(
        <NavLink className= "text-decoration-none" to={`/coins/${coin.id}`}>
            <div className='text-center'>
            <img  src={coin?.image} alt={coin.name} height="80" style={{marginBottom: 10}}/>
            <div className='d-flex flex-column'>
            <span className='text-uppercase text-white'>{coin?.symbol}
            &emsp;
            <span className='text-danger'>
                {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%  {/*(2) it will take values upto two decimal places */}
                </span>
                </span>

            <span className='text-success'>
                {symbol} {numCommas(coin?.current_price.toFixed(2))}
            </span>
            </div>
            </div>
            </NavLink>
         )
    })

    

    useEffect(()=>{
      trendcoin();
    },[ currency ])

    const responsive = {
        0:{items : 2},512:{items:4}
    }

  return (<>
    {!trending?(<div className='d-flex justify-content-center align-items-center'>
    <div className="spinner-border text-danger" role="status">
    <span className="visually-hidden">Loading...</span>
     </div>
     </div>):(<div className='kas4 container'><AliceCarousel
    mouseTracking
    infinite
    autoPlayInterval={500}
    animationDuration={1500}
    disableDotsControls
     disableButtonsControls
    responsive={responsive}
    autoPlay
    items={items}
 /></div>)}
    </>
  )
}

export default Carousel