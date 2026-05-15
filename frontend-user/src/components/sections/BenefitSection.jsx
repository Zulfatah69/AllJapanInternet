
const benefits = [
  'Layanan 24 Jam',
  'Tanpa Kontrak',
  'Tanpa Deposit',
  'Pengiriman Seluruh Jepang'
]

export default function BenefitSection() {
  return (
    <section id='benefits' className='py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-4xl font-bold mb-10'>Benefits</h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {benefits.map((item, index) => (
            <div
              key={index}
              className='bg-white/5 border border-white/10 rounded-3xl p-8'
            >
              <h3 className='text-xl font-semibold'>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
