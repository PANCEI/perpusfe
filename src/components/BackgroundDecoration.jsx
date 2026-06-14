import react from 'react';
export default function BackgroundDecoration() {
    return (
        <>
            {/* dekorasi elemmen abstract di background */}
            <div className="absolute top-10 rigt-10 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className='absolute bottom-10 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none' />
            {/* pola titik  dekoratif */}
            <div className='absolte top-1/4 right-12 opacity-30 hidden md:block'>
                <div className='grid grid-cols-4 gap-2'>
                    {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
          ))}
                </div>
            </div>
        </>
    );
}