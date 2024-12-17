import React from 'react'
import './styles/FloatingFeatures.css'

export default function FloatingFeatures() {
    return (
        <div>
            <div className='ff-container' >
                <div className="fast-bookings">
                    <h2>Fast Booking</h2>
                    <p>Book your seat in seconds <br />and skip the wait!</p>
                </div>
                <div className="fresh-food">
                    <h2>Fresh Food</h2>
                    <p>Enjoy freshly prepared meals <br /> made just for you!</p>
                </div>
                <div className="fast-service">
                    <h2>Fast Service</h2>
                    <p>Experience quick and friendly <br /> service every time!</p>
                </div>
            </div>
        </div>
    )
}
