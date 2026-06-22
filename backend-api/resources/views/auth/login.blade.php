<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>AJI Admin Panel - Login</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:300,400,600,700,900&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0f172a;
            background-image: 
                radial-gradient(at 0% 0%, hsla(353,100%,38%,0.4) 0px, transparent 50%),
                radial-gradient(at 100% 100%, hsla(0,0%,0%,1) 0px, transparent 50%);
            background-attachment: fixed;
            color: #f8fafc;
        }
        
        .glass-panel {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .input-glass {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            transition: all 0.3s ease;
        }
        
        .input-glass:focus {
            background: rgba(255, 255, 255, 0.1);
            border-color: #6366f1; /* indigo-500 */
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
            outline: none;
        }

        .btn-primary {
            background: linear-gradient(135deg, #4f46e5 0%, #312e81 100%); /* indigo-600 to indigo-900 */
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
        }
    </style>
</head>
<body class="antialiased min-h-screen flex items-center justify-center p-4">

    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-800/50 rounded-full blur-[100px]"></div>
    </div>

    <div class="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 z-10 relative overflow-hidden">
        
        <!-- Decorative line -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-blue-500 to-transparent"></div>

        <div class="text-center mb-10">
            <h1 class="text-3xl font-black tracking-tight mb-2">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-600">AJI</span> Admin
            </h1>
            <p class="text-slate-400 text-sm font-medium">Selamat datang kembali, silakan masuk ke akun Anda.</p>
        </div>

        <!-- Session Status -->
        @if (session('status'))
            <div class="mb-6 font-medium text-sm text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}" class="space-y-6">
            @csrf

            <!-- Email Address -->
            <div>
                <label for="email" class="block text-sm font-medium text-slate-300 mb-2">Alamat Email</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                    </div>
                    <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus autocomplete="username" 
                           class="input-glass w-full rounded-xl py-3 pl-12 pr-4 sm:text-sm" placeholder="admin@example.com">
                </div>
                @error('email')
                    <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                @enderror
            </div>

            <!-- Password -->
            <div>
                <div class="flex items-center justify-between mb-2">
                    <label for="password" class="block text-sm font-medium text-slate-300">Kata Sandi</label>
                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}" class="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                            Lupa kata sandi?
                        </a>
                    @endif
                </div>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <input id="password" type="password" name="password" required autocomplete="current-password" 
                           class="input-glass w-full rounded-xl py-3 pl-12 pr-4 sm:text-sm" placeholder="••••••••">
                </div>
                @error('password')
                    <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                @enderror
            </div>

            <!-- Remember Me -->
            <div class="flex items-center">
                <input id="remember_me" type="checkbox" name="remember" class="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900">
                <label for="remember_me" class="ml-2 block text-sm text-slate-300">
                    Ingat saya
                </label>
            </div>

            <button type="submit" class="btn-primary w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white shadow-lg tracking-wide">
                MASUK KE DASBOR
            </button>
        </form>
    </div>

</body>
</html>
