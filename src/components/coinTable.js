import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { numCommas } from './Banner/Carousel';
const CoinTable = () => {
    // is for coins (which contains all the coins)
   const [coins,setCoins] = useState([]);
    const [loading ,setLoading] =useState(false);

    const [page ,setPage] = useState(1);
   // this is for the input field
   const [search,setSearch] = useState('');
   
    const {currency,symbol} = CryptoState();
    const navigate = useNavigate();

   const fetch = async ()=>{
    setLoading(true);
    const currency_1 = currency;
    const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency_1}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`);
      // coinList(currency)
    setCoins(data);
    setLoading(false);
   };
     
    useEffect(()=>{
        fetch();
    },[currency])

    const handleSearch=()=>{
      
           return coins.filter((coin)=>{
            // using this search from useState 
              return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
           });
     }
   console.log(handleSearch());


   const totalPages = Math.ceil(handleSearch().length / 10);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div className='container'>
          <h1 className='text-center mt-5 mb-4'>Daily CryptoCurrency Prices Here</h1>
          <input className="form-control  mb-4 w-50 m-auto border-danger rounded-pill text-danger" type="text" placeholder="SEARCH CRYPTO" aria-label=".form-control-lg example" onChange={(e)=>{setSearch(e.target.value)}}></input>
          <div className="text-center">
               { loading ? (
                <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
                 </div>
               ):(<>
                 <table className="table bg-dark">
                 <thead>
                   <tr>
                    {
                      ["Coin","Price","24hr Change","Market Cap"].map((h)=>(
                        <th  className='bg-dark text-white' scope="col" key={h} align={h === "Coin"? "":"right"}>{h}</th>
                      ))
                      }
                   </tr>
                 </thead>
                 <tbody>

                  {handleSearch()
                  .slice((page-1)*10,(page-1)*10+10)
                  .map((row)=>{
                    
                      const profit = row.price_change_percentage_24h>0;
                      
                    return(
                      <tr onClick={()=> navigate(`/coins/${row.id}`)} key={row.name}>
                           
                      <th scope="row"  className='bg-dark text-white py-3'> 
                     
                      <img src={row?.image} alt={row.name} height="80" style={{marginBottom: 10}}/>
                      <span className='d-block text-uppercase mt-3'>{row.symbol}</span> 
                      <span className='d-block text-capitalize fw-lighter'>{row.name}</span>
                      
                      </th>
                      
                      {/* using numCommas from Carosel.js */}
                      <td className='kas5 bg-dark text-white'>{symbol}{" "}
                      {/* { console.log(row.current_price.toFixed(2))} */}
                      {numCommas(row.current_price.toFixed(2))}
                      </td>

                      <td className='bg-dark kas5' style={{color:profit>0?"rgb(14,203,129)":"red"}}>
                        {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                      </td>

                      <td className='kas5 bg-dark text-white'>{symbol}{" "}
                      {/* { console.log(row.current_price.toFixed(2))} */}
                      {numCommas(row.market_cap.toString())}
                      </td>
                     
                    </tr>
                    )
                    })}
                    
                  </tbody>
                 </table>
                  <nav aria-label="Page navigation example" className='d-flex align-items-center justify-content-center mt-5'>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link text-white bg-dark" href="#" aria-label="Previous" onClick={() => handlePageChange(page - 1)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {/* Render page numbers dynamically */}
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${page === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              <a className="page-link text-white bg-dark" href="#">
                {index + 1}
              </a>
            </li>
          ))}
          <li className="page-item ">
            <a className="page-link text-white bg-dark" href="#" aria-label="Next" onClick={() => handlePageChange(page + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
                 
                 
               </>  )}

          </div>
         
         
    </div>
  )
}

export default CoinTable