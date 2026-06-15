<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Category;

use Illuminate\Http\Request;

use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | INDEX
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        $categories = Category::orderBy('sort_order', 'asc')->latest()
            ->get();

        return view(
            'dashboard.categories.index',
            compact('categories')
        );
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create()
    {
        return view(
            'dashboard.categories.create'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $request->validate([

            'nama'
                => 'required|max:255',
            'nama_en' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',

        ]);

        Category::create([

            'nama'
                => $request->nama,
            'nama_en' => $request->nama_en,
            'sort_order' => $request->sort_order ?? 0,

            'slug'
                => Str::slug(
                    $request->nama
                ),

        ]);

        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                'Category created successfully.'
            );
    }

    /*
    |--------------------------------------------------------------------------
    | EDIT
    |--------------------------------------------------------------------------
    */

    public function edit(
        Category $category
    ) {

        return view(
            'dashboard.categories.edit',
            compact('category')
        );
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        Category $category
    ) {

        $request->validate([

            'nama'
                => 'required|max:255',
            'nama_en' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',

        ]);

        $category->update([

            'nama'
                => $request->nama,
            'nama_en' => $request->nama_en,
            'sort_order' => $request->sort_order ?? 0,

            'slug'
                => Str::slug(
                    $request->nama
                ),

        ]);

        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                'Category updated successfully.'
            );
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Category $category
    ) {

        $category->delete();

        return back()
            ->with(
                'success',
                'Category deleted successfully.'
            );
    }
}