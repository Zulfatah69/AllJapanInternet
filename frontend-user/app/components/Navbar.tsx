export default function Navbar() {

    return (

        <nav
            className="
                sticky
                top-0
                z-50
                bg-white/90
                backdrop-blur
                border-b
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-8
                    py-5
                    flex
                    items-center
                    justify-between
                "
            >

                <a
                    href="/"
                    className="
                        text-3xl
                        font-black
                    "
                >
                    AJI
                </a>

                <div
                    className="
                        flex
                        items-center
                        gap-8
                        font-semibold
                    "
                >

                    <a href="/">
                        Home
                    </a>

                    <a href="/promos">
                        Promos
                    </a>

                    <a href="/testimonials">
                        Testimonials
                    </a>

                </div>

            </div>

        </nav>
    );
}