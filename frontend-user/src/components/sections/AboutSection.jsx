
export default function AboutSection() {
  return (
    <section id='about' className='py-24 px-6 bg-white/[0.02]'>
      <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center'>
        <div>
          <h2 className='text-4xl font-bold mb-6'>About Us</h2>

          <p className='text-gray-400 leading-8'>
            All Japan Internet hadir untuk membantu WNI di Jepang mendapatkan layanan internet terbaik.
          </p>
        </div>

        <div className='h-[400px] rounded-3xl bg-white/5 border border-white/10'></div>
      </div>
    </section>
  )
}
