import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from './firebase/firebase'
import { useParams } from 'react-router-dom'
import { ThreeCircles } from 'react-loader-spinner'
import ReactStars from 'react-stars';
import Reveiw from './Reveiw'



export default function Details() {
    const { id } = useParams();
    const [moviedata, setmoviedata] = useState({
        name: "",
        title: "",
        descreption: "",
        img: "",
        year: "",
        rating: 0,
        userRated: 0
    })
    const [loading, setloading] = useState(false)
    let getdata = async () => {
        setloading(true)
        let lucky = doc(db, "movies", id);
        let data = await getDoc(lucky)
        setmoviedata(data.data())
        setloading(false)
    }
    useEffect(() => {
        getdata()
    }, [])
    return (
        <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
            {loading ? <div className='h-96 flex w-full justify-center items-center'><ThreeCircles height={30} color="white" /></div> :
                <>
                    <img className='h-96 block md:sticky top-24' src={moviedata.img} alt='image' />

                    <div className='md:ml-4 ml-0 w-full md:w-1/2'>
                        <h1 className='text-3xl font-bold text-gray-400'>{moviedata.title} <span className='text-xl'>({moviedata.year})</span></h1>

                        <ReactStars
                            size={20}
                            half={true}
                            value={moviedata.rating / moviedata.userRated}
                            edit={false}
                        />

                        <p className='mt-2 text-gray-200'>{moviedata.descreption}</p>

                        {/* <Reviews id={ieid} prevRating={data.rating} userRated={data.rated} /> */}
                        <Reveiw id={id} prevRating={moviedata.rating} userRated={moviedata.userRated} />
                    </div>
                </>}
        </div>
    )
}
