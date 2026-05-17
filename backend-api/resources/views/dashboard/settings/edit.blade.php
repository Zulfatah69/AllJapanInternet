@extends('layouts.admin')

@section('content')

<h1 class="text-4xl font-bold mb-10">
    Website Settings
</h1>

<div class="bg-white rounded-3xl shadow p-10">

    <form
        action="{{ route('settings.update') }}"
        method="POST"
        enctype="multipart/form-data"
    >

        @csrf

        <div class="grid grid-cols-2 gap-8">

            <div>

                <label class="block mb-3 font-semibold">
                    Website Name
                </label>

                <input
                    type="text"
                    name="website_name"
                    value="{{ $setting->website_name }}"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

            </div>

            <div>

                <label class="block mb-3 font-semibold">
                    Email
                </label>

                <input
                    type="text"
                    name="email"
                    value="{{ $setting->email }}"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

            </div>

            <div>

                <label class="block mb-3 font-semibold">
                    WhatsApp
                </label>

                <input
                    type="text"
                    name="whatsapp"
                    value="{{ $setting->whatsapp }}"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

            </div>

            <div>

                <label class="block mb-3 font-semibold">
                    Telegram
                </label>

                <input
                    type="text"
                    name="telegram"
                    value="{{ $setting->telegram }}"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

            </div>

            <div>

                <label class="block mb-3 font-semibold">
                    Instagram
                </label>

                <input
                    type="text"
                    name="instagram"
                    value="{{ $setting->instagram }}"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

            </div>

            <div>

                <label class="block mb-3 font-semibold">
                    TikTok
                </label>

                <input
                    type="text"
                    name="tiktok"
                    value="{{ $setting->tiktok }}"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

            </div>

        </div>

        <div class="mt-8">

            <label class="block mb-3 font-semibold">
                Footer Text
            </label>

            <textarea
                name="footer_text"
                rows="5"
                class="
                    w-full
                    border
                    rounded-2xl
                    px-5
                    py-4
                "
            >{{ $setting->footer_text }}</textarea>

        </div>

        <div class="grid grid-cols-2 gap-8 mt-8">

            <div>

                <label class="block mb-3 font-semibold">
                    Logo
                </label>

                <input
                    type="file"
                    name="logo"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

            </div>

            <div>

                <label class="block mb-3 font-semibold">
                    Favicon
                </label>

                <input
                    type="file"
                    name="favicon"
                    class="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-4
                    "
                >

            </div>

        </div>
        <div class="mt-8">

            <label class="block mb-3 font-semibold">
                Website Theme
            </label>

            <select
                name="theme"
                class="
                    w-full
                    border
                    rounded-2xl
                    px-5
                    py-4
                "
            >

                <option
                    value="spring"
                    @selected($setting->theme == 'spring')
                >
                    🌸 Spring
                </option>

                <option
                    value="summer"
                    @selected($setting->theme == 'summer')
                >
                    ☀️ Summer
                </option>

                <option
                    value="autumn"
                    @selected($setting->theme == 'autumn')
                >
                    🍁 Autumn
                </option>

                <option
                    value="winter"
                    @selected($setting->theme == 'winter')
                >
                    ❄️ Winter
                </option>

            </select>

        </div>
        <button
            class="
                mt-10
                bg-black
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
            "
        >
            Save Settings
        </button>

    </form>

</div>

@endsection