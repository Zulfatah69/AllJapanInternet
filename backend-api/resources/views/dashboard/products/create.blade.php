@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Add Product
</h1>

<div class="bg-white rounded-2xl shadow p-8">

    <form
        action="{{ route('products.store') }}"
        method="POST"
        enctype="multipart/form-data"
    >

        @csrf

        <div class="grid grid-cols-2 gap-8">

            {{-- CATEGORY --}}
            <div>

                <label class="block mb-3 font-semibold">
                    Category
                </label>

                <select
                    name="category_id"
                    class="w-full border rounded-xl px-5 py-4"
                >

                    <option value="">
                        Select Category
                    </option>

                    @foreach($categories as $category)

                        <option value="{{ $category->id }}">

                            {{ $category->nama }}

                        </option>

                    @endforeach

                </select>

            </div>

            {{-- PROVIDER --}}
            <div>

                <label class="block mb-3 font-semibold">
                    Provider
                </label>

                <input
                    type="text"
                    name="provider"
                    class="w-full border rounded-xl px-5 py-4"
                    placeholder="Softbank"
                >

            </div>

        </div>

        {{-- PRODUCT CODE --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Product Code
            </label>

            <select
                name="code"
                class="w-full border rounded-xl px-5 py-4"
            >

                <option value="">
                    Select Code
                </option>

                <option value="VT">
                    VT
                </option>

                <option value="GJ">
                    GJ
                </option>

            </select>

        </div>

        {{-- TYPE --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Type
            </label>

            <select
                name="type"
                class="w-full border rounded-xl px-5 py-4"
            >

                <option value="">
                    Select Type
                </option>

                <option value="physical">
                    Physical SIM
                </option>

                <option value="esim">
                    E-SIM
                </option>

                <option value="phone">
                    Phone + Internet
                </option>

            </select>

        </div>

        {{-- BILLING --}}
        <div class="mb-8">

            <label class="block mb-3 font-semibold">
                Billing Type
            </label>

            <select
                name="billing_type"
                class="w-full border rounded-xl px-5 py-4"
            >

                <option value="">
                    Select Billing
                </option>

                <option value="monthly">
                    Monthly
                </option>

                <option value="yearly">
                    Yearly
                </option>

            </select>

        </div>

        {{-- PRODUCT NAME --}}
        <div class="mt-8">

            <label class="block mb-3 font-semibold">
                Product Name
            </label>

            <input
                type="text"
                name="nama"
                class="w-full border rounded-xl px-5 py-4"
                placeholder="Softbank Internet Bulanan"
            >

        </div>

        {{-- DESCRIPTION --}}
        <div class="mt-8">

            <label class="block mb-3 font-semibold">
                Description
            </label>

            <textarea
                name="deskripsi"
                rows="6"
                class="w-full border rounded-xl px-5 py-4"
            ></textarea>

        </div>

        {{-- THUMBNAIL --}}
        <div class="mt-8">

            <label class="block mb-3 font-semibold">
                Thumbnail
            </label>

            <input
                type="file"
                name="thumbnail"
                class="w-full border rounded-xl px-5 py-4"
            >

        </div>

        {{-- BEST SELLER --}}
        <div class="mt-8 flex items-center gap-3">

            <input
                type="checkbox"
                name="best_seller"
                value="1"
                class="w-5 h-5"
            >

            <label class="font-semibold">
                Best Seller
            </label>

        </div>

        {{-- BUTTON --}}
        <div class="mt-10">

            <button
                class="bg-black text-white px-8 py-4 rounded-xl"
            >
                Save Product
            </button>

        </div>

    </form>

</div>

@endsection