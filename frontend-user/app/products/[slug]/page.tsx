'use client';

import {
    useEffect,
    useState,
} from 'react';

import api from '../../lib/api';

export default function ProductDetail({
    params,
}: {
    params: Promise<{
        slug: string;
    }>;
}) {

    const [slug, setSlug] =
        useState('');

    const [product, setProduct] =
        useState<any>(null);

    const [setting, setSetting] =
        useState<any>(null);

    const [
        selectedVariant,
        setSelectedVariant
    ] = useState<any>(null);

    const [
        selectedBilling,
        setSelectedBilling
    ] = useState<any>(null);

    const [
        selectedPayment,
        setSelectedPayment
    ] = useState<any>(null);

    useEffect(() => {

        async function resolveParams() {

            const resolved =
                await params;

            setSlug(
                resolved.slug
            );
        }

        resolveParams();

    }, [params]);

    useEffect(() => {

        if (slug) {

            fetchProduct();

            loadSettings();
        }

    }, [slug]);

    async function fetchProduct() {

        try {

            const response =
                await api.get(
                    `/products/${slug}`
                );

            setProduct(
                response.data
            );

            if (
                response.data?.variants &&
                response.data
                    .variants.length > 0
            ) {

                const firstVariant =
                    response.data
                        .variants[0];

                setSelectedVariant(
                    firstVariant
                );

                if (
                    firstVariant
                        ?.billing_periods &&
                    firstVariant
                        .billing_periods.length > 0
                ) {

                    setSelectedBilling(

                        firstVariant
                            .billing_periods[0]

                    );
                }

                if (
                    response.data
                        ?.payment_methods &&
                    response.data
                        .payment_methods.length > 0
                ) {

                    setSelectedPayment(

                        response.data
                            .payment_methods[0]

                    );
                }
            }

        } catch (error) {

            console.log(error);

        }
    }

    async function loadSettings() {

        try {

            const response =
                await api.get(
                    '/settings'
                );

            setSetting(
                response.data
            );

        } catch (error) {

            console.log(error);

        }
    }

    function selectVariant(
        variant: any
    ) {

        setSelectedVariant(
            variant
        );

        if (
            variant?.billing_periods &&
            variant
                .billing_periods.length > 0
        ) {

            setSelectedBilling(

                variant
                    .billing_periods[0]

            );
        }
    }

    function orderWhatsApp() {

        if (
            !product ||
            !selectedVariant
        ) {
            return;
        }

        const total =

            Number(
                selectedBilling
                    ?.initial_price || 0
            )

            +

            Number(
                selectedPayment
                    ?.additional_price || 0
            );

        const message =

            `Hello Admin,%0A%0A` +

            `I want to order:%0A%0A` +

            `Product: ${product.nama}%0A` +

            `Variant: ${selectedVariant.gb}%0A` +

            `Billing Period: ${selectedBilling?.nama}%0A` +

            `Payment Method: ${selectedPayment?.nama}%0A` +

            `Total: ¥${total}%0A%0A` +

            `Thank you`;

        window.open(

            `https://wa.me/${setting?.whatsapp}?text=${message}`,

            '_blank'
        );
    }

    if (!product) {

        return <div>Loading...</div>;
    }

    return (

        <div className="max-w-7xl mx-auto p-5 md:p-10">

            <div
                className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-10
                "
            >

                <img
                    src={
                        product.thumbnail_url
                    }
                    className="
                        w-full
                        rounded-3xl
                    "
                />

                <div>

                    <div
                        className="
                            flex
                            gap-3
                            mb-5
                            flex-wrap
                        "
                    >

                        <div
                            className="
                                bg-black
                                text-white
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                font-bold
                            "
                        >
                            {product.type}
                        </div>

                        <div
                            className="
                                border
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                font-bold
                            "
                        >
                            {
                                product.provider?.nama
                            }
                        </div>

                        <div
                            className="
                                border
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                font-bold
                            "
                        >
                            {
                                product.category?.nama
                            }
                        </div>

                    </div>

                    <h1
                        className="
                            text-3xl
                            md:text-5xl
                            font-black
                            mb-5
                        "
                    >
                        {product.nama}
                    </h1>

                    <p
                        className="
                            text-gray-600
                            mb-10
                            whitespace-pre-line
                        "
                    >
                        {product.deskripsi}
                    </p>

                    {/* VARIANT */}

                    <div className="mb-8">

                        <h2
                            className="
                                text-xl
                                font-black
                                mb-4
                            "
                        >
                            Variant
                        </h2>

                        <div className="space-y-4">

                            {product?.variants?.map(
                                (variant: any) => (

                                    <button
                                        key={variant.id}
                                        onClick={() =>
                                            selectVariant(
                                                variant
                                            )
                                        }
                                        className={`

                                            w-full
                                            border
                                            rounded-2xl
                                            p-5
                                            text-left
                                            transition

                                            ${
                                                selectedVariant?.id ===
                                                variant.id

                                                ?

                                                'bg-black text-white'

                                                :

                                                'bg-white'
                                            }

                                        `}
                                    >

                                        <div
                                            className="
                                                flex
                                                justify-between
                                            "
                                        >

                                            <span>

                                                {variant.gb}

                                            </span>

                                            <span>

                                                ¥
                                                {variant.monthly_price}

                                            </span>

                                        </div>

                                    </button>

                                )
                            )}

                        </div>

                    </div>

                    {/* BILLING */}

                    <div className="mb-8">

                        <h2
                            className="
                                text-xl
                                font-black
                                mb-4
                            "
                        >
                            Billing Period
                        </h2>

                        <div className="space-y-3">

                            {selectedVariant
                                ?.billing_periods
                                ?.map((period: any) => (

                                    <button
                                        key={period.id}
                                        onClick={() =>
                                            setSelectedBilling(
                                                period
                                            )
                                        }
                                        className={`

                                            w-full
                                            border
                                            rounded-2xl
                                            p-4
                                            text-left
                                            transition

                                            ${
                                                selectedBilling?.id ===
                                                period.id

                                                ?

                                                'bg-black text-white'

                                                :

                                                'bg-white'
                                            }

                                        `}
                                    >

                                        <div
                                            className="
                                                flex
                                                justify-between
                                            "
                                        >

                                            <span>
                                                {period.nama}
                                            </span>

                                            <span>

                                                ¥
                                                {period.initial_price}

                                            </span>

                                        </div>

                                    </button>

                                ))}

                        </div>

                    </div>

                    {/* PAYMENT */}

                    <div className="mb-8">

                        <h2
                            className="
                                text-xl
                                font-black
                                mb-4
                            "
                        >
                            Payment Method
                        </h2>

                        <div className="space-y-3">

                            {product
                                ?.payment_methods
                                ?.map((payment: any) => (

                                    <button
                                        key={payment.id}
                                        onClick={() =>
                                            setSelectedPayment(
                                                payment
                                            )
                                        }
                                        className={`

                                            w-full
                                            border
                                            rounded-2xl
                                            p-4
                                            text-left
                                            transition

                                            ${
                                                selectedPayment?.id ===
                                                payment.id

                                                ?

                                                'bg-black text-white'

                                                :

                                                'bg-white'
                                            }

                                        `}
                                    >

                                        <div
                                            className="
                                                flex
                                                justify-between
                                            "
                                        >

                                            <span>
                                                {payment.nama}
                                            </span>

                                            <span>

                                                +¥
                                                {payment.additional_price}

                                            </span>

                                        </div>

                                    </button>

                                ))}

                        </div>

                    </div>

                    {/* TOTAL */}

                    <div
                        className="
                            bg-black
                            text-white
                            rounded-3xl
                            p-6
                            mb-8
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-black
                                mb-3
                            "
                        >
                            Total
                        </h2>

                        <p
                            className="
                                text-4xl
                                font-black
                            "
                        >

                            ¥

                            {

                                Number(
                                    selectedBilling
                                        ?.initial_price || 0
                                )

                                +

                                Number(
                                    selectedPayment
                                        ?.additional_price || 0
                                )

                            }

                        </p>

                    </div>

                    <button
                        onClick={
                            orderWhatsApp
                        }
                        className="
                            w-full
                            bg-green-500
                            text-white
                            px-8
                            py-5
                            rounded-2xl
                            font-bold
                        "
                    >
                        Order via WhatsApp
                    </button>

                </div>

            </div>

        </div>
    );
}