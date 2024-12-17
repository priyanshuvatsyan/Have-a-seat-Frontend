import React from 'react';

import BestDeliveredCard from './BestDeliveredCard'

export default function BestDelivered( {items}) {
  return (
    <div className="best-delivered-container">
        
        <div className='row g-3' >
            {items.length > 0 ? (
                   items.map((item)=>(
                    <div className="col-md-4 d-flex justify-content-center"  key={item._id} >
                            
                            <BestDeliveredCard  foodItem={item} options={item.options[0]}  />
                    </div>
                   ))
            ):(
                <div>
                    Loading...
                </div>
            )}
        </div>
    </div>
  )
}
