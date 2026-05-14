<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Promo;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

use Intervention\Image\Laravel\Facades\Image;

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

            $image = Image::read($file)
                ->resize(1920, 1080)
                ->toWebp(80);

            Storage::disk('public')->put(

                'promos/' . $filename,

                (string) $image

            );

            $gambar =
                'promos/' . $filename;
        }

        Promo::create([

            'judul'
                => $request->judul,

            'deskripsi'
                => $request->deskripsi,

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

            $image = Image::read($file)
                ->resize(1920, 1080)
                ->toWebp(80);

            Storage::disk('public')->put(

                'promos/' . $filename,

                (string) $image

            );

            $gambar =
                'promos/' . $filename;
        }

        $promo->update([

            'judul'
                => $request->judul,

            'deskripsi'
                => $request->deskripsi,

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