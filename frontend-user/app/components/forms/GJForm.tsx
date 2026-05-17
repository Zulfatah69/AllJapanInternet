"use client";

import { useState } from "react";

import {
  orderPreview
} from "@/app/services/api";

export default function GJForm({

  product,
  variant,
  price,
  shipping,

}: any) {

  const [loading,
    setLoading] =
    useState(false);

  const [preview,
    setPreview] =
    useState<any>(null);

  const [form,
    setForm] =
    useState({

      name: "",
      postcode: "",
      address: "",
      email: "",

      eid_number: "",

      ekyc_time: "",

      delivery_date: "",

    });

  async function handleSubmit() {

    if (
      !variant ||
      !price ||
      !shipping
    ) {

      alert(
        "Please complete selection"
      );

      return;

    }

    try {

      setLoading(true);

      const response =
        await orderPreview({

          variant_id:
            variant.id,

          purchase_period_id:
            price.id,

          shipping_method_id:
            shipping.id,

          ...form,

        });

      setPreview(
        response.data
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed preview order"
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="space-y-5">

      {/* NAME */}

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({

            ...form,

            name:
              e.target.value,

          })
        }
        className="
          w-full
          border
          rounded-xl
          px-5
          py-4
        "
      />

      {/* POSTCODE */}

      <input
        placeholder="Postcode"
        value={form.postcode}
        onChange={(e) =>
          setForm({

            ...form,

            postcode:
              e.target.value,

          })
        }
        className="
          w-full
          border
          rounded-xl
          px-5
          py-4
        "
      />

      {/* ADDRESS */}

      <textarea
        placeholder="Address"
        value={form.address}
        onChange={(e) =>
          setForm({

            ...form,

            address:
              e.target.value,

          })
        }
        className="
          w-full
          border
          rounded-xl
          px-5
          py-4
        "
      />

      {/* EMAIL */}

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({

            ...form,

            email:
              e.target.value,

          })
        }
        className="
          w-full
          border
          rounded-xl
          px-5
          py-4
        "
      />

      {/* ESIM */}

      {product.type ===
        "esim" && (

        <input
          placeholder="EID Number"
          value={form.eid_number}
          onChange={(e) =>
            setForm({

              ...form,

              eid_number:
                e.target.value,

            })
          }
          className="
            w-full
            border
            rounded-xl
            px-5
            py-4
          "
        />

      )}

      {/* TELPON */}

      {product.type ===
        "telpon" && (

        <input
          placeholder="Jam eKYC"
          value={form.ekyc_time}
          onChange={(e) =>
            setForm({

              ...form,

              ekyc_time:
                e.target.value,

            })
          }
          className="
            w-full
            border
            rounded-xl
            px-5
            py-4
          "
        />

      )}

      {/* SIMCARD */}

      {product.type ===
        "simcard" && (

        <input
          type="date"
          value={form.delivery_date}
          onChange={(e) =>
            setForm({

              ...form,

              delivery_date:
                e.target.value,

            })
          }
          className="
            w-full
            border
            rounded-xl
            px-5
            py-4
          "
        />

      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          bg-black
          text-white
          px-8
          py-4
          rounded-xl
          disabled:opacity-50
        "
      >

        {loading
          ? "Loading..."
          : "Order Now"}

      </button>

      {/* PREVIEW */}

      {preview && (

        <div
          className="
            border
            rounded-3xl
            p-8
            mt-10
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              mb-5
            "
          >
            Order Preview
          </h2>

          <div className="space-y-3">

            <p>
              Product:
              {" "}
              {preview.product}
            </p>

            <p>
              Variant:
              {" "}
              {preview.variant}
            </p>

            <p>
              Period:
              {" "}
              {preview.period}
            </p>

            <p>
              Shipping:
              {" "}
              {preview.shipping}
            </p>

            <p
              className="
                text-4xl
                font-bold
                text-red-500
              "
            >
              ¥ {preview.total}
            </p>

            <a
              href={preview.wa_link}
              target="_blank"
              className="
                inline-block
                mt-5
                bg-green-500
                text-white
                px-6
                py-3
                rounded-xl
              "
            >
              Continue to WhatsApp
            </a>

          </div>

        </div>

      )}

    </div>

  );
}