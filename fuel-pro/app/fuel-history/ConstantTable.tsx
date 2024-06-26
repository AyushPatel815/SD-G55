// import React from 'react';
import Image from 'next/image';

// interface Row {
//   Order_Number: number;
//   GallonsRequested: number;
//   DeliveryAddress: string;
//   DeliveryDate: string;
//   Price: string;
// }

// const BasicTable: React.FC = () => {
  
//   const tableData: Row[] = [
//     { Order_Number: 1, GallonsRequested: 59,  DeliveryAddress: '430 MLK Blvd, Houston, TX', DeliveryDate:'02/21/2024', Price: "$800"},
//     { Order_Number: 3, GallonsRequested: 72,  DeliveryAddress: '789 Elm St, Another City, CA', DeliveryDate:'02/23/2024', Price: "$950" },
//     { Order_Number: 4, GallonsRequested: 35,  DeliveryAddress: '456 Oak St, Somewhere, FL', DeliveryDate:'02/24/2024', Price: "$500" },
//     { Order_Number: 5, GallonsRequested: 40,  DeliveryAddress: '123 Pine St, Anytown, USA', DeliveryDate:'02/25/2024', Price: "$600" },
//     { Order_Number: 6, GallonsRequested: 68,  DeliveryAddress: '789 Maple St, Another City, CA', DeliveryDate:'02/26/2024', Price: "$850" },
//     { Order_Number: 7, GallonsRequested: 50,  DeliveryAddress: '456 Birch St, Somewhere, FL', DeliveryDate:'02/27/2024', Price: "$700" },
//     { Order_Number: 8, GallonsRequested: 55,  DeliveryAddress: '789 Cedar St, Anytown, USA', DeliveryDate:'02/28/2024', Price: "$750" },
//     { Order_Number: 9, GallonsRequested: 60,  DeliveryAddress: '123 Oak St, Another City, CA', DeliveryDate:'02/29/2024', Price: "$900" },
//     { Order_Number: 10, GallonsRequested: 75,  DeliveryAddress: '456 Pine St, Somewhere, FL', DeliveryDate:'03/01/2024', Price: "$1000" },
//     { Order_Number: 11, GallonsRequested: 48,  DeliveryAddress: '789 Elm St, Anytown, USA', DeliveryDate:'03/02/2024', Price: "$700" },
//     { Order_Number: 12, GallonsRequested: 63,  DeliveryAddress: '123 Maple St, Another City, CA', DeliveryDate:'03/03/2024', Price: "$950" },
//     { Order_Number: 13, GallonsRequested: 42,  DeliveryAddress: '456 Birch St, Somewhere, FL', DeliveryDate:'03/04/2024', Price: "$550" },
//     { Order_Number: 14, GallonsRequested: 57,  DeliveryAddress: '789 Cedar St, Anytown, USA', DeliveryDate:'03/05/2024', Price: "$800" },
//     { Order_Number: 15, GallonsRequested: 55,  DeliveryAddress: '123 Elm St, Another City, CA', DeliveryDate:'03/06/2024', Price: "$720" },
//     { Order_Number: 16, GallonsRequested: 70,  DeliveryAddress: '456 Maple St, Somewhere, FL', DeliveryDate:'03/07/2024', Price: "$980" },
//     { Order_Number: 17, GallonsRequested: 38,  DeliveryAddress: '789 Oak St, Anytown, USA', DeliveryDate:'03/08/2024', Price: "$600" },
//     { Order_Number: 18, GallonsRequested: 45,  DeliveryAddress: '123 Pine St, Another City, CA', DeliveryDate:'03/09/2024', Price: "$720" },
//     { Order_Number: 19, GallonsRequested: 62,  DeliveryAddress: '456 Cedar St, Somewhere, FL', DeliveryDate:'03/10/2024', Price: "$920" },
//   ];

//   return (
//     // the border in the line below is the border around the entire table, not just for a cell
//     <div>
//     <div className='relative'>
//       <Image className='fixed inset-0 h-screen w-screen object-cover object-center z-[-50] brightness-[65%]'
//         src='/dashboard-img.png'
//         alt={''} width={600} height={600}></Image>
//       </div>

//     <div className=' bg-transparent bg-blue-400'>
//     <div className='mt-16 ml-[20%] mx-14 flex overflow-auto h-[600px] justify-center border bg-transparent border-black w-[1350px]'>
//       {/* change bg-color-intensity below to change the background color for the table */}
//       {/* All border-color-intensity puts borders on the idividual cells of whatever color you want */}
//       <table className='border bg-blue-50 overflow-auto w-[1400px]  h-[90px] font-serif'>
//         <thead>
//           <tr>
//             <th className='border border-green-900 bg-green-50 p-2'>Order Number</th>
//             <th className='border border-green-900 bg-green-50 p-2'>Gallons Requested</th>
//             <th className='border border-green-900 bg-green-50 p-2'>Delivery Address</th>
//             <th className='border border-green-900 bg-green-50 p-2'>Delivery Date</th>
//             <th className='border border-green-900 bg-green-50 p-2'>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row: Row) => (
//             <tr key={row.Order_Number}>
//               <td className='border border-green-900 p-2'>{row.Order_Number}</td>
//               <td className='border border-green-900 p-2'>{row.GallonsRequested}</td>
//               <td className='border border-green-900 p-2'>{row.DeliveryAddress}</td>
//               <td className='border border-green-900 p-2'>{row.DeliveryDate}</td>
//               <td className='border border-green-900 p-2'>{row.Price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default BasicTable;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Quote {
  id: string;
  date: string;
  gallons: number;
  price: number;
  due: number;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

const QuoteList = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get<{ quotes: Quote[] }>('http://localhost:4000/quote', { withCredentials: true });
        setQuotes(response.data.quotes);
      } catch (error) {
        setError('Failed to fetch quotes');
      }
    };

    fetchQuotes();
  }, []);

  const innerCss = 'border border-green-900 p-2 bg-white';
  return (
    <div>
      <div className='relative'>
        <Image className='fixed inset-0 h-screen w-screen object-cover object-center z-[-50] brightness-[65%]'
          src='/dashboard-img.png'
          alt={''} width={600} height={600}></Image>
      </div>
      {/* <h2 className=' textt-white'>Fuel Quote History</h2> */}
      <div className='mt-16 ml-[20%] mx-14 flex overflow-auto h-[600px] border bg-transparent border-black w-[1350px]' >

      {quotes.length === 0 ? (
        <p className=' text-white'>No quotes found</p>
      ) : (
        <table>
          <thead>
            <tr>
                  <th className={innerCss}
                  >Date</th>
                  <th className={innerCss}
                  >Gallons</th>
                  <th className={innerCss}
                  >Price</th>
                  <th className={innerCss}
                  >Due</th>
                  <th className={innerCss}
                  >Address</th>
                  <th className={innerCss}
                  >City</th>
                  <th className={innerCss}
                  >State</th>
                  <th className={innerCss}
                  >Zipcode</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id}>
                <td className={innerCss}
                >{quote.date}</td>
                <td className={innerCss}
                >{quote.gallons}</td>
                <td className={innerCss}
                >{quote.price}</td>
                <td className={innerCss}
                >{quote.due}</td>
                <td className={innerCss}
                >{quote.address}</td>
                <td className={innerCss}
                >{quote.city}</td>
                <td className={innerCss}
                >{quote.state}</td>
                <td className={innerCss}
                >{quote.zipcode}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default QuoteList;
