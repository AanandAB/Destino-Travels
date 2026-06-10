export default function ContactMap() {
  return (
    <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.8!2d75.556311!3d11.983304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU4JzU5LjkiTiA3NcKwMzMnMjIuNyJF!5e0!3m2!1sen!2sin!4v1690000000000"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(0.85)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Destino Tours & Travels - Irikkur, Kannur"
      />
    </div>
  )
}
