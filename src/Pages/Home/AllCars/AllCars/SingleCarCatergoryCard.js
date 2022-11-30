import React from 'react';
import { Link } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const SingleCarCatergoryCard = ({ car }) => {
    const { _id, Name, image, price, } = car;
    const limit = 100;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl p-2" style={{ width: '95%' }}>
            <figure>
                <PhotoProvider>
                    <PhotoView src={image}>
                        <img src={image} className='h-48' alt="Shoes" />
                    </PhotoView>
                </PhotoProvider>

            </figure>
            <div className="card-body">
                <h2 className="card-title text-1xl capitalize">{Name}</h2>
                <div className="card-actions justify-start">
                    <h3 className='text-black-600' style={{ fontSize: '17px' }}><strong>Price</strong> : ${price}</h3>
                </div>
                <div className='flex justify-end'>
                    <Link to={`/featured-cars/${_id}`} className='btn btn-outline btn-secondary btn-sm'>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleCarCatergoryCard;