<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\Testimonial;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::latest()
            ->get();

        return view(
            'dashboard.testimonials.index',
            compact('testimonials')
        );
    }

    public function create()
    {
        return view(
            'dashboard.testimonials.create'
        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'image'
                => 'required|image|max:2048',

        ]);

        $image = $request
            ->file('image')
            ->store(
                'testimonials',
                'public'
            );

        Testimonial::create([

            'image'
                => $image,

        ]);

        return redirect()
            ->route(
                'testimonials.index'
            )
            ->with(
                'success',
                'Testimonial created successfully.'
            );
    }

    public function edit(
        Testimonial $testimonial
    ) {

        return view(
            'dashboard.testimonials.edit',
            compact('testimonial')
        );
    }

    public function update(
        Request $request,
        Testimonial $testimonial
    ) {

        $request->validate([

            'image'
                => 'nullable|image|max:2048',

        ]);

        $image = $testimonial->image;

        if ($request->hasFile('image')) {

            if ($testimonial->image) {

                Storage::disk('public')
                    ->delete(
                        $testimonial->image
                    );
            }

            $image = $request
                ->file('image')
                ->store(
                    'testimonials',
                    'public'
                );
        }

        $testimonial->update([

            'image'
                => $image,

        ]);

        return redirect()
            ->route(
                'testimonials.index'
            )
            ->with(
                'success',
                'Testimonial updated successfully.'
            );
    }

    public function destroy(
        Testimonial $testimonial
    ) {

        if ($testimonial->image) {

            Storage::disk('public')
                ->delete(
                    $testimonial->image
                );
        }

        $testimonial->delete();

        return back()->with(
            'success',
            'Testimonial deleted successfully.'
        );
    }
}