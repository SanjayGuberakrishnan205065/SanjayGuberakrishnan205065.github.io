import Marquee from "react-fast-marquee";

const MyMarquee = () => (
  <Marquee>
    <div className="flex gap-16 text-xl my-3">
      <div>25+ Intern offers</div>
      <div className="flex gap-2">
        <div>
          <img src="/logos/decathlon.png" alt="decathlon" className="h-7" />
        </div>
        <div>Coupons for Top Performers</div>
      </div>
      <div className="flex gap-2">
        <div>
          <img src="/logos/naturals.png" alt="naturals" className="h-7" />
        </div>
        <div>Coupons for Top Performers</div>
      </div>
    </div>
  </Marquee>
);

export default MyMarquee;
