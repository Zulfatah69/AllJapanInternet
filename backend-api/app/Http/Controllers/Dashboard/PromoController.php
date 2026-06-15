<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Promo;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

class PromoController extends Controller
{
    public function index()
    {
        $promos = Promo::latest()->get();

        return view(
            'dashboard.promos.index',
            compact('promos')
        );
    }

    public function create()
    {
        return view(
            'dashboard.promos.create'
        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'judul'
                => 'required',
            'judul_en' => 'nullable|string|max:255',

            'gambar'
                => 'nullable|image|max:2048',

            'start_date'
                => 'nullable|date',

            'end_date'
                => 'nullable|date',

        ]);

        $gambar = null;

        if ($request->hasFile('gambar')) {

            $file = $request->file('gambar');

            $filename =
                time() . '.webp';

            $image = imagecreatefromstring(
                file_get_contents($file)
            );

            $width =
                imagesx($image);

            $height =
                imagesy($image);

            $newImage = imagecreatetruecolor(
                2100,
                900
            );

            imagecopyresampled(

                $newImage,

                $image,

                0,
                0,
                0,
                0,

                2100,
                900,

                $width,
                $height

            );

            ob_start();

            imagewebp(
                $newImage,
                null,
                80
            );

            $webpImage =
                ob_get_clean();

            Storage::disk('public')->put(

                'promos/' . $filename,

                $webpImage

            );

            imagedestroy($image);

            imagedestroy($newImage);

            $gambar =
                'promos/' . $filename;
        }

        Promo::create([

            'judul'
                => $request->judul,
            'judul_en' => $request->judul_en,

            'deskripsi'
                => $request->deskripsi,
            'deskripsi_en' => $request->deskripsi_en,

            'gambar'
                => $gambar,

            'link'
                => $request->link,

            'start_date'
                => $request->start_date,

            'end_date'
                => $request->end_date,

            'is_active'
                => true,

        ]);

        return redirect()
            ->route('promos.index');
    }

    public function edit(Promo $promo)
    {
        return view(
            'dashboard.promos.edit',
            compact('promo')
        );
    }

    public function update(
        Request $request,
        Promo $promo
    ) {

        $request->validate([

            'judul'
                => 'required',
            'judul_en' => 'nullable|string|max:255',

            'gambar'
                => 'nullable|image|max:2048',

            'start_date'
                => 'nullable|date',

            'end_date'
                => 'nullable|date',

        ]);

        $gambar = $promo->gambar;

        if ($request->hasFile('gambar')) {

            if ($promo->gambar) {

                Storage::disk('public')
                    ->delete(
                        $promo->gambar
                    );
            }

            $file = $request->file('gambar');

            $filename =
                time() . '.webp';

            $image = imagecreatefromstring(
                file_get_contents($file)
            );

            $width =
                imagesx($image);

            $height =
                imagesy($image);

            $newImage = imagecreatetruecolor(
                2100,
                900
            );

            imagecopyresampled(

                $newImage,

                $image,

                0,
                0,
                0,
                0,

                2100,
                900,

                $width,
                $height

            );

            ob_start();

            imagewebp(
                $newImage,
                null,
                80
            );

            $webpImage =
                ob_get_clean();

            Storage::disk('public')->put(

                'promos/' . $filename,

                $webpImage

            );

            imagedestroy($image);

            imagedestroy($newImage);

            $gambar =
                'promos/' . $filename;
        }

        $promo->update([

            'judul'
                => $request->judul,
            'judul_en' => $request->judul_en,

            'deskripsi'
                => $request->deskripsi,
            'deskripsi_en' => $request->deskripsi_en,

            'gambar'
                => $gambar,

            'link'
                => $request->link,

            'start_date'
                => $request->start_date,

            'end_date'
                => $request->end_date,

        ]);

        return redirect()
            ->route('promos.index');
    }

    public function destroy(Promo $promo)
    {
        if ($promo->gambar) {

            Storage::disk('public')
                ->delete(
                    $promo->gambar
                );
        }

        $promo->delete();

        return back();
    }
}