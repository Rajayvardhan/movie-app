import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { moviesRef } from './firebase/firebase';
import { Link } from 'react-router-dom';
import img from "../assest/maxresdefault.jpg"

export default function () {
    const [data, setdata] = useState([])
    const [loader, setloader] = useState(false)
    useEffect(() => {
        const getdata = async () => {
            setloader(true);
            const dataSnapshot = await getDocs(moviesRef);
            const newData = [];

            dataSnapshot.forEach((doc) => {
                newData.push({ ...(doc.data()), id: doc.id });
            });

            setdata(newData);
            setloader(false);
        }

        getdata();
    }, []);
    return (
        <>
            <div className="hero">
                <div ><img className=" w-full" src={img} alt="img" /></div>
            </div>
            <div className="flex flex-wrap  px-3 mt-2">
                {loader ? <div className='w-full flex justify-center items-center h-96'> <ThreeDots height={40} /></div> :
                    data.map((e, i) => {
                        return (
                            <Link to={`/details/${e.id}`} > <div key={i} className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
                                <img className="h-60 md:h-50 imgcard" src={e.img} alt='img2' />
                                <h1>
                                    <span className="text-gray-500 mr-1">Movie-name</span>
                                    {e.title}
                                </h1>
                                <h1 className="flex items-center">
                                    <span className="text-gray-500 mr-1">Rating:</span>
                                    <ReactStars
                                        size={20}
                                        half={true}
                                        value={e.rating}
                                        edit={false}
                                    />
                                </h1>
                                <h1>
                                    <span className="text-gray-500">Year:</span> {e.year}
                                </h1>
                            </div>
                            </Link>
                        );
                    })
                }
            </div>
        </>
    )
}
