import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import Loader from "../loader/Loader";

const Location = () => {
  const [loadingMap, setLoadingMap] = useState(true);
  return (
    <div className="page-view mx-auto container">
      <Typography color="white" variant="h1">
        Location
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          {loadingMap && <Loader />}
          <iframe
            className="min-h-[70vh]"
            width="100%"
            height="100%"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3708766642585!2d80.13734147405013!3d12.948103515395111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525fac595c29ff%3A0xb76082ae18b51418!2sMadras%20Institute%20of%20Technology%2C%20Anna%20University!5e0!3m2!1sen!2sin!4v1709120049182!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoadingMap(false)}
          ></iframe>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <Typography variant="h3">Address</Typography>
            <div>
              Department of Information Technology, MIT Campus, Anna University
            </div>
            <div>
              MIT Rd, Radha Nagar, Chromepet, Chennai, Tamil Nadu 600044
            </div>
          </div>
          <div>
            <Typography variant="h3">Public Transport</Typography>
            <div>Nearest Railway Station (Chennai Local Trains): Chromepet</div>
            <div>Nearest Railway Station (Long Distance Trains): Tambaram</div>
            <div>
              Nearest Metro Station: Chennai International Airport (Blue Line)
            </div>
            <div>Nearst Bus stop: Chromepet</div>
          </div>
          <div>
            <Typography variant="h3">
              Directions from Railway stations
            </Typography>
            <div className="my-3">
              <Typography variant="h5">
                From Chennai Central Railway Station (via Local Train)
              </Typography>
              <div>
                <ul>
                  <li>
                    Take the metro subway to Chennai Park Railway Station (About
                    3 mins walk)
                  </li>
                  <li>
                    Take the local train from Park station to Chromepet ( Trains
                    going towards Tambaram or Chengalpattu )
                  </li>
                  <li>
                    Chromepet is the 13th station from Chennai Park (About 40
                    mins)
                  </li>
                  <li>
                    Chennai Park &#8211; Chennai Egmore ... Pallavaram &#8211;
                    Chromepet
                  </li>
                  <li>
                    The campus is located right next to the Chromepet Railway
                    Station (Opposite to the GST Road side)
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-3">
              <Typography variant="h5">
                From Tambaram Railway Station (via Local Train)
              </Typography>
              <div>
                <ul>
                  <li>
                    Take the local train from Tambaram to Chromepet (Trains
                    going towards Beach Station)
                  </li>
                  <li>
                    Chromepet is the second station from Tambaram (About 10
                    mins)
                  </li>
                  <li>
                    Tambaram &#8211; Tambaram Sanatorium &#8211; Chromepet
                  </li>
                  <li>
                    The campus is located right next to the Chromepet Railway
                    Station (Opposite to the GST Road side)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Location;
