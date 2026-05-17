'use client';

import {
    useEffect,
    useState,
} from 'react';

import api from '../lib/api';

export default function PromosPage() {

    const [promos, setPromos] =
        useState<any[]>([]);

    useEffect(() => {

        fetchPromos();

    }, []);

    async function fetchPromos() {

        try {

            const response =
                await api.get(
                    '/promos'
                );

            setPromos(
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
                Promotions
            </h1>

            <div
                className="
                    grid
                    grid-cols-3
                    gap-8
                "
            >

                {promos.map((promo) => (

                    <a
                        key={promo.id}
                        href={promo.link}
                        className="
                            bg-white
                            rounded-3xl
                            overflow-hidden
                            shadow
                        "
                    >

                        <img
                            src={`
                                ${process.env.NEXT_PUBLIC_STORAGE_URL}/${promo.gambar}
                            `}
                            className="
                                w-full
                                h-72
                                object-cover
                            "
                        />

                    </a>

                ))}

            </div>

        </main>
    );
}