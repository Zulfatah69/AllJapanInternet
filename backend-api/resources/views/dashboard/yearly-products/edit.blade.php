@extends('layouts.admin')

@section('content')

<div class="max-w-7xl mx-auto">

    <div class="mb-8 flex items-center justify-between">
        <div>
            <div class="flex items-center gap-2 mb-2 text-sm font-medium text-slate-500">
                <a href="{{ route('yearly-products.index') }}" class="hover:text-indigo-600 transition-colors">Produk Tahunan</a>
                <span>/</span>
                <span class="text-slate-800">Edit Produk</span>
            </div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Edit Produk: {{ $product->nama }}</h1>
        </div>
    </div>

    @if ($errors->any())
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 class="text-sm font-semibold text-red-800 mb-1">Terdapat kesalahan pengisian form:</h3>
                    <ul class="list-disc pl-4 text-sm text-red-700 space-y-1">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    @endif

    <form action="{{ route('yearly-products.update', $product->id) }}" method="POST" enctype="multipart/form-data" class="pb-20">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {{-- KOLOM KIRI - INFORMASI PRODUK --}}
            <div class="lg:col-span-8 space-y-8">
                
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Informasi Produk
                        </h2>
                    </div>
                    
                    <div class="p-6 space-y-6">
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label class="block mb-2 text-sm font-semibold text-slate-700">Kategori</label>
                                <select name="category_id" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                                    <option value="">Pilih Kategori...</option>
                                    @foreach($categories as $category)
                                        <option value="{{ $category->id }}" {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>
                                            {{ $category->nama }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            
                            <div>
                                <label class="block mb-2 text-sm font-semibold text-slate-700">Penyedia Layanan (Provider)</label>
                                <select name="provider_id" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                                    <option value="">Pilih Penyedia...</option>
                                    @foreach($providers as $provider)
                                        <option value="{{ $provider->id }}" {{ old('provider_id', $product->provider_id) == $provider->id ? 'selected' : '' }}>
                                            {{ $provider->nama }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Nama Produk</label>
                            <input type="text" name="nama" value="{{ old('nama', $product->nama) }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Nama Produk (Inggris)</label>
                            <input type="text" name="nama_en" value="{{ old('nama_en', $product->nama_en) }}" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Deskripsi Produk</label>
                            <textarea name="deskripsi" rows="4" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">{{ old('deskripsi', $product->deskripsi) }}</textarea>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-semibold text-slate-700">Deskripsi Produk (Inggris)</label>
                            <textarea name="deskripsi_en" rows="4" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">{{ old('deskripsi_en', $product->deskripsi_en) }}</textarea>
                        </div>

                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-sm font-semibold text-slate-700">Gambar Produk (Thumbnail)</label>
                                @if($product->thumbnail)
                                    <button type="button" onclick="deleteImage()" class="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        Hapus Gambar Saat Ini
                                    </button>
                                @endif
                            </div>
                            <x-image-upload name="thumbnail" :existingImage="$product->thumbnail" />
                        </div>
                        
                        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="best_seller" value="1" class="sr-only peer" {{ old('best_seller', $product->best_seller) ? 'checked' : '' }}>
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                <span class="ml-3 text-sm font-semibold text-slate-700">Tandai sebagai Best Seller</span>
                            </label>
                        </div>

                    </div>
                </div>
                
                {{-- VARIAN PRODUK --}}
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden" x-data="variantManager()">
                    <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            Varian & Harga
                        </h2>
                        <button type="button" @click="addVariant()" class="text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            Tambah Varian
                        </button>
                    </div>
                    
                    <div class="p-6">
                        <div class="space-y-6">
                            <template x-for="(variant, index) in variants" :key="variant.key">
                                <div class="relative bg-slate-50 border border-slate-200 rounded-xl p-5 pt-8 transition-all">
                                    
                                    <button type="button" @click="removeVariant(index)" class="absolute top-3 right-3 text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors" title="Hapus Varian">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                    
                                    <input type="hidden" :name="`variants[${index}][id]`" x-model="variant.id">

                                    <div class="flex flex-wrap items-end gap-4 mb-5">
                                        <div class="flex-1 min-w-[200px]">
                                            <label class="block mb-2 text-sm font-semibold text-slate-700">Nama Varian</label>
                                            <input type="text" :name="`variants[${index}][nama]`" x-model="variant.nama" placeholder="Contoh: 35GB" class="w-full border-slate-200 rounded-xl px-4 py-2.5 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white">
                                        </div>
                                        
                                        <!-- Active Toggle For existing variants -->
                                        <div class="mb-2" x-show="variant.id">
                                            <label class="relative inline-flex items-center cursor-pointer" title="Ubah status aktif varian">
                                                <input type="checkbox" class="sr-only peer toggle-variant-active" :data-id="variant.id" :checked="variant.is_active">
                                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                                <span class="ml-2 text-sm font-medium text-slate-600">Aktif</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label class="block mb-3 text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">Harga berdasarkan Masa Aktif</label>
                                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                            <template x-for="period in periods" :key="period">
                                                <div>
                                                    <label class="block mb-1.5 text-xs font-bold text-slate-500" x-text="period"></label>
                                                    <div class="relative">
                                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <span class="text-slate-400 font-medium">¥</span>
                                                        </div>
                                                        <input type="number" :name="`variants[${index}][periods][${period}]`" x-model="variant.periodValues[period]" class="w-full border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white">
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    
                                </div>
                            </template>
                            
                            <div x-show="variants.length === 0" class="text-center py-10 bg-slate-50 border border-slate-200 border-dashed rounded-xl">
                                <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                <p class="text-slate-500 font-medium mb-1">Belum ada varian ditambahkan</p>
                                <p class="text-sm text-slate-400 mb-4">Klik tombol di atas untuk menambahkan varian.</p>
                                <button type="button" @click="addVariant()" class="text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm">
                                    Tambah Varian Pertama
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {{-- KOLOM KANAN - METODE PEMBAYARAN & SUBMIT --}}
            <div class="lg:col-span-4 space-y-8">
                
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-8">
                    <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            Metode Pembayaran
                        </h2>
                    </div>
                    
                    <div class="p-6">
                        <p class="text-sm text-slate-500 mb-6">Tentukan biaya tambahan untuk setiap metode pembayaran.</p>
                        
                        <div class="space-y-4">
                            @foreach($product->paymentMethods as $index => $payment)
                                <div class="grid grid-cols-2 gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div>
                                        <span class="font-bold text-slate-700 flex items-center gap-2">
                                            @if($payment->nama == 'COD')
                                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                            @elseif($payment->nama == 'TF')
                                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                                            @else
                                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            @endif
                                            {{ $payment->nama }}
                                        </span>
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-xs font-semibold text-slate-500 uppercase">Harga Tambahan (¥)</label>
                                        <input type="number" name="payment_methods[{{ $index }}][additional_price]" value="{{ old('payment_methods.'.$index.'.additional_price', $payment->additional_price) }}" class="w-full border-slate-200 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white">
                                        <input type="hidden" name="payment_methods[{{ $index }}][nama]" value="{{ $payment->nama }}">
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    
                    <div class="p-6 bg-slate-50 border-t border-slate-100">
                        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-bold shadow-sm shadow-indigo-200 transition-colors flex justify-center items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            Simpan Perubahan
                        </button>
                        <a href="{{ route('yearly-products.index') }}" class="block w-full text-center mt-3 px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors">
                            Batal
                        </a>
                    </div>
                </div>

            </div>
            
        </div>
    </form>

</div>

<!-- Initial Data for Alpine -->
@php
    $initialVariants = collect($product->variants)->map(function($variant) {
        $periodsObj = new stdClass();
        foreach($variant->billingPeriods as $period) {
            $nama = $period->nama;
            $periodsObj->$nama = $period->initial_price;
        }
        return [
            'id' => $variant->id,
            'nama' => $variant->nama,
            'is_active' => $variant->is_active,
            'periodValues' => $periodsObj
        ];
    });
@endphp

<script>
    window.initialVariants = @json($initialVariants);
</script>

<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('variantManager', () => ({
            variants: [],
            variantIdCounter: 0,
            periods: ['13 BULAN', '12 BULAN', '9 BULAN', '6 BULAN', '3 BULAN'],
            
            init() {
                if (window.initialVariants && window.initialVariants.length > 0) {
                    this.variants = window.initialVariants.map(v => {
                        v.key = this.variantIdCounter++;
                        // Ensure all periods exist in the object
                        if(!v.periodValues) v.periodValues = {};
                        this.periods.forEach(p => {
                            if(v.periodValues[p] === undefined) v.periodValues[p] = '';
                        });
                        return v;
                    });
                } else {
                    this.addVariant();
                }

                // Setup toggle listeners after rendering
                this.$nextTick(() => {
                    this.setupToggles();
                });
            },
            
            addVariant() {
                const newVariant = {
                    key: this.variantIdCounter++,
                    id: '',
                    nama: '',
                    is_active: 1,
                    periodValues: {}
                };
                this.periods.forEach(p => newVariant.periodValues[p] = '');
                this.variants.push(newVariant);
            },
            
            removeVariant(index) {
                if(confirm('Apakah Anda yakin ingin menghapus varian ini?')) {
                    this.variants.splice(index, 1);
                }
            },

            setupToggles() {
                const toggles = document.querySelectorAll('.toggle-variant-active');
                toggles.forEach(toggle => {
                    // Prevent duplicate listeners
                    if(toggle.dataset.listenerAttached) return;
                    toggle.dataset.listenerAttached = 'true';

                    toggle.addEventListener('change', function() {
                        const variantId = this.getAttribute('data-id');
                        const isChecked = this.checked;
                        
                        if(!variantId) return; // New unsaved variants

                        fetch(`/dashboard/yearly-products/variants/${variantId}/toggle-active`, {
                            method: 'POST',
                            headers: {
                                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            if(!data.success) {
                                this.checked = !isChecked; // revert
                                alert('Gagal mengubah status');
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            this.checked = !isChecked; // revert
                            alert('Terjadi kesalahan koneksi');
                        });
                    });
                });
            }
        }));
    });

    function deleteImage() {
        if(confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
            fetch("{{ route('yearly-products.delete-image', $product->id) }}", {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    window.location.reload();
                } else {
                    alert('Gagal menghapus gambar');
                }
            })
            .catch(e => {
                console.error(e);
                alert('Terjadi kesalahan koneksi');
            });
        }
    }
</script>

@endsection