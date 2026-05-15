
export default function ContactSection() {
  return (
    <section id='contact' className='py-24 px-6 bg-white/[0.02]'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-4xl font-bold mb-10'>Contact</h2>

        <div className='grid md:grid-cols-3 gap-6'>
          <div className='bg-white/5 border border-white/10 rounded-3xl p-6'>
            <h3 className='text-xl font-semibold mb-3'>WhatsApp</h3>
            <p className='text-gray-400'>+81 90 0000 0000</p>
          </div>

          <div className='bg-white/5 border border-white/10 rounded-3xl p-6'>
            <h3 className='text-xl font-semibold mb-3'>Instagram</h3>
            <p className='text-gray-400'>@alljapaninternet</p>
          </div>

          <div className='bg-white/5 border border-white/10 rounded-3xl p-6'>
            <h3 className='text-xl font-semibold mb-3'>Email</h3>
            <p className='text-gray-400'>support@aji.jp</p>
          </div>
        </div>
      </div>
    </section>
  )
}
