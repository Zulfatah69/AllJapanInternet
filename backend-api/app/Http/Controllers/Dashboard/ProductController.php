<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Product;
use App\Models\Category;

use Illuminate\Http\Request;

use Illuminate\Support\Str;

use Illuminate\Support\Facades\Storage;

use Intervention\Image\Laravel\Facades\Image;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(
            'category'
        )
        ->latest()
        ->get();

        return view(
            'dashboard.products.index',
            compact('products')
        );
    }

    public function create()
    {
        $categories = Category::all();

        return view(
            'dashboard.products.create',
            compact('categories')
        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'category_id'
                => 'required',

            'nama'
                => 'required',

            'thumbnail'
                => 'nullable|image|max:2048',

            'code'
                => 'nullable',

            'type'
                => 'nullable',

            'billing_type'
                => 'nullable',

        ]);

        $thumbnail = null;

        if ($request->hasFile('thumbnail')) {

            $file = $request->file('thumbnail');

            $filename =
                time() . '.webp';

            $image = Image::read($file)
                ->resize(1200, 1200)
                ->toWebp(80);

            Storage::disk('public')->put(

                'products/' . $filename,

                (string) $image

            );

            $thumbnail =
                'products/' . $filename;
        }

        Product::create([

            'category_id'
                => $request->category_id,

            'nama'
                => $request->nama,

            'slug'
                => Str::slug(
                    $request->nama
                ),

            'provider'
                => $request->provider,

            'code'
                => $request->code,

            'type'
                => $request->type,

            'billing_type'
                => $request->billing_type,

            'deskripsi'
                => $request->deskripsi,

            'thumbnail'
                => $thumbnail,

            'best_seller'
                => $request->best_seller
                    ? true
                    : false,

            'is_active'
                => true,

        ]);

        return redirect()
            ->route('products.index')
            ->with(
                'success',
                'Product created'
            );
    }

    public function edit(Product $product)
    {
        $categories = Category::all();

        return view(
            'dashboard.products.edit',
            compact(
                'product',
                'categories'
            )
        );
    }

    public function update(
        Request $request,
        Product $product
    ) {

        $request->validate([

            'category_id'
                => 'required',

            'nama'
                => 'required',

            'thumbnail'
                => 'nullable|image|max:2048',

            'code'
                => 'nullable',

            'type'
                => 'nullable',

            'billing_type'
                => 'nullable',

        ]);

        $thumbnail = $product->thumbnail;

        if ($request->hasFile('thumbnail')) {

            if ($product->thumbnail) {

                Storage::disk('public')
                    ->delete(
                        $product->thumbnail
                    );
            }

            $file = $request->file('thumbnail');

            $filename =
                time() . '.webp';

            $image = Image::read($file)
                ->resize(1200, 1200)
                ->toWebp(80);

            Storage::disk('public')->put(

                'products/' . $filename,

                (string) $image

            );

            $thumbnail =
                'products/' . $filename;
        }

        $product->update([

            'category_id'
                => $request->category_id,

            'nama'
                => $request->nama,

            'slug'
                => Str::slug(
                    $request->nama
                ),

            'provider'
                => $request->provider,

            'code'
                => $request->code,

            'type'
                => $request->type,

            'billing_type'
                => $request->billing_type,

            'deskripsi'
                => $request->deskripsi,

            'thumbnail'
                => $thumbnail,

            'best_seller'
                => $request->best_seller
                    ? true
                    : false,

        ]);

        return redirect()
            ->route('products.index');
    }

    public function toggle(Product $product)
    {
        $product->update([

            'is_active'
                => !$product->is_active,

        ]);

        return back();
    }

    public function destroy(
        Product $product
    ) {

        if ($product->thumbnail) {

            Storage::disk('public')
                ->delete(
                    $product->thumbnail
                );
        }

        $product->delete();

        return back();
    }
}