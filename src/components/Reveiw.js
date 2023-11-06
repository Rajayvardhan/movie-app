import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { db, reviewsRef } from './firebase/firebase'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import { addDoc, doc, getDocs, updateDoc, where, query } from 'firebase/firestore'
import swal from 'sweetalert'
export default function Reveiw({ id, prevRating, userRated }) {
    const [rating, setrating] = useState(0)
    const [loading, setloading] = useState(false)
    const [reveiwloading, setreviewloading] = useState(false)
    const [form, setform] = useState("")
    const [data, setdata] = useState([])


    let addreview = async () => {
        setloading(true)
        try {
            await addDoc(reviewsRef, {
                name: "vicky",
                movieid: id,
                thought: form,
                rating: rating,
                timestamp: new Date().getTime()
            })
            const ref = doc(db, "movies", id)
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1

            })
            setform("")
            setrating(0)
            swal({
                title: "review sent",
                icon: "success",
                buttons: false,
                timer: 3000
            })
            setloading(false)
        }
        catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })

        }
    }
    useEffect(() => {
        async function getdata() {

            setreviewloading(true)
            let quer = query(reviewsRef, where("movieid", "==", id))
            const querysnapshot = await getDocs(quer);
            querysnapshot.forEach((element) => {
                setdata((prev) => [...prev, element.data()])

            });
            setreviewloading(false)
        }
        getdata();
    }, [])
    return (
        <div className='mt-4 w-full py-1 border-t-2 border-gray-700'>
            <ReactStars size={30}
                half={true}
                value={rating}
                onChange={rate => setrating((rate))} />
            <input type="text" className='w-full outline-none bg-gray-700  p-3  ' placeholder='share your thoughts' value={form} onChange={e => setform(e.target.value)} />
            <button className='bg-green-700 p-1 w-full mt-1 flex justify-center' onClick={addreview}>{loading ? <TailSpin height={20} /> : "share"} </button>
            {reveiwloading ?
                <div className=' flex justify-center mt-3'>
                    <ThreeDots height={20} color='white' />
                </div>
                :
                <div className='mt-4'>
                    {data.map((data, i) => {
                        return (
                            <div className='p-2 w-full mt-2 border-b header border-gray-600'>
                                <div className='flex items-center'>

                                    <p className='text-blue-500'>{data.name}</p>
                                    <p className='ml-3 text-xs'>({new Date(data.timestamp).toLocaleString()})</p>
                                </div>
                                <ReactStars
                                    size={30}
                                    half={true}
                                    value={data.rating}
                                    edit={false}
                                />
                                <p>{data.thought}</p>

                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}
