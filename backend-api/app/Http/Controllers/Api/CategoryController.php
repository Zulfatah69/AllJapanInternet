<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->get();

        return response()->json(

            $categories->map(function ($category) {

                return [

                    'id'
                        => $category->id,

                    'nama'
                        => $category->nama,

                    'slug'
                        => $category->slug,

                ];

            })

        );
    }
}