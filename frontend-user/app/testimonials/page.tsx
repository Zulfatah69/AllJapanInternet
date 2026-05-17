'use client';

import {
    useEffect,
    useState,
} from 'react';

import api from '../lib/api';

export default function TestimonialsPage() {

    const [
        testimonials,
        setTestimonials
    ] = useState<any[]>([]);

    useEffect(() => {

        fetchTestimonials();

    }, []);

    async function fetchTestimonials() {

        try {

            const response =
                await api.get(
                    '/testimonials'
                );

            setTestimonials(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }

    return (

        <main className="p-10">

            <h1
                className="
                    text-5xl
                    font-black
                    mb-10
                "
            >
                Testimonials
            </h1>

            <div
                className="
                    grid
                    grid-cols-4
                    gap-6
                "
            >

                {testimonials.map((item) => (

                    <img
                        key={item.id}
                        src={`
                            ${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.gambar}
                        `}
                        className="
                            rounded-3xl
                            shadow
                        "
                    />

                ))}

            </div>

        </main>
    );
}