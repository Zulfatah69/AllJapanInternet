<nav
    x-data="{ open: false }"
    class="
        bg-white
        border-b
        border-gray-200
        sticky
        top-0
        z-50
    "
>

    <div
        class="
            max-w-7xl
            mx-auto
            px-6
        "
    >

        <div
            class="
                flex
                justify-between
                h-20
            "
        >

            {{-- LEFT --}}
            <div class="flex items-center gap-10">

                {{-- LOGO --}}
                <a
                    href="{{ route('dashboard') }}"
                    class="
                        text-2xl
                        font-black
                        tracking-tight
                    "
                >
                    ALL JAPAN INTERNET
                </a>

                {{-- MENU --}}
                <div
                    class="
                        hidden
                        lg:flex
                        items-center
                        gap-7
                    "
                >

                    <a
                        href="{{ route('dashboard') }}"
                        class="
                            font-semibold
                            hover:text-black
                            transition
                        "
                    >
                        Dashboard
                    </a>

                    <a
                        href="{{ route('categories.index') }}"
                        class="
                            font-semibold
                            hover:text-black
                            transition
                        "
                    >
                        Categories
                    </a>

                    <a
                        href="{{ route('providers.index') }}"
                        class="
                            font-semibold
                            hover:text-black
                            transition
                        "
                    >
                        Providers
                    </a>

                    <a
                        href="{{ route('monthly-products.index') }}"
                        class="
                            font-semibold
                            hover:text-black
                            transition
                        "
                    >
                        Monthly Products
                    </a>

                    <a
                        href="{{ route('yearly-products.index') }}"
                        class="
                            font-semibold
                            hover:text-black
                            transition
                        "
                    >
                        Yearly Products
                    </a>

                    <a
                        href="{{ route('promos.index') }}"
                        class="
                            font-semibold
                            hover:text-black
                            transition
                        "
                    >
                        Promos
                    </a>

                    <a
                        href="{{ route('testimonials.index') }}"
                        class="
                            font-semibold
                            hover:text-black
                            transition
                        "
                    >
                        Testimonials
                    </a>

                    <a
                        href="{{ route('themes.edit') }}"
                        class="
                            font-semibold
                            hover:text-black
                            transition
                        "
                    >
                        Themes
                    </a>

                    <a
                        href="{{ route('settings.edit') }}"
                        class="
                            font-semibold
                            hover:text-black
                            transition
                        "
                    >
                        Settings
                    </a>

                </div>

            </div>

            {{-- RIGHT --}}
            <div
                class="
                    hidden
                    lg:flex
                    items-center
                "
            >

                <x-dropdown
                    align="right"
                    width="56"
                >

                    <x-slot name="trigger">

                        <button
                            class="
                                flex
                                items-center
                                gap-3
                                bg-gray-100
                                px-5
                                py-3
                                rounded-2xl
                                hover:bg-gray-200
                                transition
                            "
                        >

                            <div
                                class="
                                    text-left
                                "
                            >

                                <div
                                    class="
                                        font-bold
                                        text-sm
                                    "
                                >
                                    {{ Auth::user()->name }}
                                </div>

                                <div
                                    class="
                                        text-xs
                                        text-gray-500
                                    "
                                >
                                    Administrator
                                </div>

                            </div>

                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>

                        </button>

                    </x-slot>

                    <x-slot name="content">

                        <x-dropdown-link
                            :href="route('profile.edit')"
                        >
                            Profile
                        </x-dropdown-link>

                        <form
                            method="POST"
                            action="{{ route('logout') }}"
                        >

                            @csrf

                            <x-dropdown-link
                                :href="route('logout')"
                                onclick="
                                    event.preventDefault();
                                    this.closest('form').submit();
                                "
                            >
                                Logout
                            </x-dropdown-link>

                        </form>

                    </x-slot>

                </x-dropdown>

            </div>

            {{-- MOBILE BUTTON --}}
            <div
                class="
                    flex
                    items-center
                    lg:hidden
                "
            >

                <button
                    @click="open = !open"
                    class="
                        p-2
                        rounded-xl
                        border
                    "
                >

                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >

                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />

                    </svg>

                </button>

            </div>

        </div>

    </div>

    {{-- MOBILE MENU --}}
    <div
        x-show="open"
        class="
            lg:hidden
            border-t
            bg-white
        "
    >

        <div class="p-6 space-y-4">

            <a
                href="{{ route('dashboard') }}"
                class="block font-semibold"
            >
                Dashboard
            </a>

            <a
                href="{{ route('categories.index') }}"
                class="block font-semibold"
            >
                Categories
            </a>

            <a
                href="{{ route('providers.index') }}"
                class="block font-semibold"
            >
                Providers
            </a>

            <a
                href="{{ route('monthly-products.index') }}"
                class="block font-semibold"
            >
                Monthly Products
            </a>

            <a
                href="{{ route('yearly-products.index') }}"
                class="block font-semibold"
            >
                Yearly Products
            </a>

            <a
                href="{{ route('promos.index') }}"
                class="block font-semibold"
            >
                Promos
            </a>

            <a
                href="{{ route('testimonials.index') }}"
                class="block font-semibold"
            >
                Testimonials
            </a>

            <a
                href="{{ route('themes.edit') }}"
                class="block font-semibold"
            >
                Themes
            </a>

            <a
                href="{{ route('settings.edit') }}"
                class="block font-semibold"
            >
                Settings
            </a>

        </div>

    </div>

</nav>