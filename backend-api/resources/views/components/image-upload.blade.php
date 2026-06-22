@props(['name', 'existingUrl' => null])

<div
    x-data="{ 
        isDropping: false, 
        previewUrl: '{{ $existingUrl }}',
        handleFileDrop(e) {
            if (e.dataTransfer.files.length > 0) {
                this.$refs.fileInput.files = e.dataTransfer.files;
                this.updatePreview(e.dataTransfer.files[0]);
            }
        },
        handleFileSelect(e) {
            if (e.target.files.length > 0) {
                this.updatePreview(e.target.files[0]);
            }
        },
        updatePreview(file) {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }"
    class="relative"
>
    <!-- Hidden input -->
    <input 
        type="file" 
        name="{{ $name }}" 
        x-ref="fileInput"
        @change="handleFileSelect"
        class="hidden"
        accept="image/*"
    >

    <div
        @dragover.prevent="isDropping = true"
        @dragleave.prevent="isDropping = false"
        @drop.prevent="isDropping = false; handleFileDrop($event)"
        @click="$refs.fileInput.click()"
        :class="{'border-indigo-500 bg-indigo-50': isDropping, 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50': !isDropping}"
        class="w-full border-2 border-dashed rounded-2xl cursor-pointer transition-all p-4 text-center flex flex-col items-center justify-center min-h-[160px]"
    >
        
        <template x-if="previewUrl">
            <div class="relative w-full rounded-xl overflow-hidden shadow-sm">
                <img :src="previewUrl" class="w-full h-40 object-cover">
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span class="text-white font-medium bg-black/50 px-4 py-2 rounded-lg">Ganti Gambar</span>
                </div>
            </div>
        </template>

        <template x-if="!previewUrl">
            <div class="flex flex-col items-center py-6">
                <svg class="w-10 h-10 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                <p class="text-slate-600 font-semibold mb-1">Klik atau seret gambar ke sini</p>
                <p class="text-slate-400 text-sm">PNG, JPG, WEBP (Maks. 2MB)</p>
            </div>
        </template>
        
    </div>
</div>
