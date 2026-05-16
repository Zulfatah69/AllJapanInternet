<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

use App\Models\PurchasePeriod;

use Illuminate\Http\Request;

class PurchasePeriodController extends Controller
{
    public function index()
    {
        $periods = PurchasePeriod::latest()->get();

        return view(
            'dashboard.purchase-periods.index',
            compact('periods')
        );
    }

    public function create()
    {
        return view(
            'dashboard.purchase-periods.create'
        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'nama' => 'required',

        ]);

        PurchasePeriod::create([

            'nama'
                => $request->nama,

            'is_active'
                => true,

        ]);

        return redirect()
            ->route('purchase-periods.index');
    }

    public function edit(
        PurchasePeriod $purchasePeriod
    ) {

        return view(
            'dashboard.purchase-periods.edit',
            compact('purchasePeriod')
        );
    }

    public function update(
        Request $request,
        PurchasePeriod $purchasePeriod
    ) {

        $request->validate([

            'nama' => 'required',

        ]);

        $purchasePeriod->update([

            'nama'
                => $request->nama,

        ]);

        return redirect()
            ->route('purchase-periods.index');
    }

    public function destroy(
        PurchasePeriod $purchasePeriod
    ) {

        $purchasePeriod->delete();

        return back();
    }
}