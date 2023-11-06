import { addDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { moviesRef } from './firebase/firebase'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

export default function Addmovie() {
    let Navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        year: "",
        descreption: "",
        img: ""
    })
    const [loader, setloader] = useState(false)
    let addmovie = async () => {
        setloader(true)
        try {
            await addDoc(moviesRef, form)
            swal({
                title: "successfully added",
                icon: "success",
                buttons: false,
                timer: 300
            })
            setForm({
                title: "",
                year: "",
                descreption: "",
                img: ""
            })
            Navigate("/")
        }
        catch (error) {
            swal({
                title: error,
                icon: "warning",
                buttons: false,
                timer: 3000

            })
        }
        setloader(false)

    }
    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-8 mx-auto ">
                    <div className="flex flex-col text-center  mb-4 mr-10 ">
                        <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">
                            Add Movie
                        </h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2  ml-12">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full md:w-64 lg:w-96 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2 ml-2 mb-2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-300">
                                        Year
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: e.target.value })}

                                        className="w-full md:w-64 lg:w-96 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2 ml-2 mb-2">
                                <div className="relative mr-3   ">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-300">
                                        Image Link
                                    </label>
                                    <input
                                        id="message"
                                        name="message"
                                        value={form.img}

                                        onChange={(e) => setForm({ ...form, img: e.target.value })}
                                        className="w-full md:w-64 lg:w-96 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2 ml-2 mb-2">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.descreption}
                                        onChange={(e) => setForm({ ...form, descreption: e.target.value })}

                                        className="w-full md:w-64 lg:w-96 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 w-full mr-10">
                            <button onClick={addmovie} className="flex mx-auto text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                                {loader ? <TailSpin height={25} /> : "Addmovie"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
