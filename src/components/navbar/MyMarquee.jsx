import Marquee from "react-fast-marquee";

const MyMarquee = () => (
  <Marquee>
    <div className="flex text-xl my-3">
      <div className="mx-10">25+ Intern offers</div>
      <div className="bg-red-300 px-3">
        Online tickets sale will be CLOSED on <b>15th March by 11 PM</b>
      </div>
      <div className="mx-10">2L+ Prize Money</div>
      <div className="flex gap-2 mx-10">
        <div>
          <img src="/logos/decathlon.png" alt="decathlon" className="h-7" />
        </div>
        <div>Coupons for Top Performers</div>
      </div>
      <div className="flex gap-2 mx-10">
        <div>
          <img src="/logos/naturals.png" alt="naturals" className="h-7" />
        </div>
        <div>Coupons for Top Performers</div>
      </div>
    </div>
  </Marquee>
);

export default MyMarquee;
