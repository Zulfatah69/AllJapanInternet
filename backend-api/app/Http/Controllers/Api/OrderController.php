<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\ProductVariant;
use App\Models\VariantPrice;
use App\Models\ShippingMethod;
use App\Models\Setting;

class OrderController extends Controller
{
    public function preview(Request $request)
    {
        $request->validate([

            'variant_id'
                => 'required',

            'purchase_period_id'
                => 'required',

            'shipping_method_id'
                => 'required',

        ]);

        $variant = ProductVariant::with(
            'product'
        )->findOrFail(
            $request->variant_id
        );

        $price = VariantPrice::with(
            'period'
        )
        ->where(
            'product_variant_id',
            $request->variant_id
        )
        ->where(
            'purchase_period_id',
            $request->purchase_period_id
        )
        ->firstOrFail();

        $shipping = ShippingMethod::findOrFail(
            $request->shipping_method_id
        );

        $subtotal = $price->harga;

        $shippingPrice = $shipping->harga;

        $total =
            $subtotal +
            $shippingPrice;

        $message =

"Hallo Admin, saya ingin memesan:

Produk: {$variant->product->nama}
Variant: {$variant->nama}
Periode Pembelian: {$price->period->nama}
Pengiriman: {$shipping->nama}

Subtotal: ¥{$subtotal}
Ongkir: ¥{$shippingPrice}

Total: ¥{$total}
";

        $whatsappNumber = Setting::where(
            'key',
            'whatsapp_number'
        )->value('value');

        $waLink =
            "https://wa.me/" .
            $whatsappNumber .
            "?text=" .
            urlencode($message);

        return response()->json([

            'product'
                => $variant->product->nama,

            'variant'
                => $variant->nama,

            'period'
                => $price->period->nama,

            'shipping'
                => $shipping->nama,

            'subtotal'
                => $subtotal,

            'shipping_price'
                => $shippingPrice,

            'total'
                => $total,

            'wa_message'
                => $message,

            'wa_link'
                => $waLink,

        ]);
    }
}