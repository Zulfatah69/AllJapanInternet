<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Page;

class PageController extends Controller
{
    public function show($slug)
    {
        $page = Page::where(
            'slug',
            $slug
        )
        ->where(
            'status_aktif',
            true
        )
        ->first();

        if (!$page) {

            return response()->json([
                'message' => 'Page not found',
            ], 404);
        }

        return response()->json([
            'data' => $page,
        ]);
    }
}