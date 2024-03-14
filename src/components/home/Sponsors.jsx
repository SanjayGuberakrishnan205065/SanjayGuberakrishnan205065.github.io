const Sponsors = () => {
  const sponsors = [
    "guvi.png",
    "qoruz.png",
    "poorvika.jpg",
    "spirent.svg",
    "happyLyf.jpg",
    "indiaTherapist.jpeg",
    "shortflix.webp",
  ];
  return (
    <section className="py-8 px-8 lg:py-20 bg-white">
      <div className="container mx-auto text-center">
        <div className="text-xl text-blue-gray-900 mb-8">SPONSORED BY</div>
        <div className="flex flex-wrap items-center justify-evenly gap-6">
          {sponsors.map((logo, key) => (
            <img key={key} src={`/logos/${logo}`} alt={logo} className="w-40" />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Sponsors;
