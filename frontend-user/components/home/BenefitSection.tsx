import {
  Wifi,
  Globe,
  Truck,
} from "lucide-react";

const benefits = [
  {
    title: "Internet Cepat",
    icon: Wifi,
  },
  {
    title: "Coverage Jepang",
    icon: Globe,
  },
  {
    title: "Pengiriman Cepat",
    icon: Truck,
  },
];

export default function BenefitSection() {
  return (
    <section className="py-16">

      <div className="container-custom">

        <div className="grid md:grid-cols-3 gap-6">

          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="border rounded-3xl p-8"
              >
                <Icon className="w-10 h-10 mb-5" />

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}