<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Category;

use Illuminate\Http\Request;

use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->get();

        return view(
            'dashboard.categories.index',
            compact('categories')
        );
    }

    public function create()
    {
        return view(
            'dashboard.categories.create'
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
        ]);

        Category::create([

            'nama' => $request->nama,

            'slug' => Str::slug(
                $request->nama
            ),

        ]);

        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                'Category created'
            );
    }

    public function edit(Category $category)
    {
        return view(
            'dashboard.categories.edit',
            compact('category')
        );
    }

    public function update(
        Request $request,
        Category $category
    ) {

        $request->validate([
            'nama' => 'required',
        ]);

        $category->update([

            'nama' => $request->nama,

            'slug' => Str::slug(
                $request->nama
            ),

        ]);

        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                'Category updated'
            );
    }

    public function destroy(
        Category $category
    ) {

        $category->delete();

        return back()->with(
            'success',
            'Category deleted'
        );
    }
}