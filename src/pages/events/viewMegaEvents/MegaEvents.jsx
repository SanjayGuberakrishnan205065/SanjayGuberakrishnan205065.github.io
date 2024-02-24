import axios from "axios";
import { useState, useEffect } from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import EventsList from "../../../components/events/EventsList";
import Loader from "../../loader/Loader";

const MegaEvents = () => {
  const fetchUrl = "/api/events/upcoming-events";
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("Hackathon");
  const [hackathonEvents, setHackathonEvents] = useState([]);
  const [paperPresentationEvents, setPaperPresentationEvents] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        label: "Hackathon",
        value: "Hackathon",
        desc: <EventsList events={hackathonEvents} />,
      },
      {
        label: "Paper Presentation",
        value: "Paper Presentation",
        desc: <EventsList events={paperPresentationEvents} />,
      },
    ]);
  }, [paperPresentationEvents, hackathonEvents]);

  useEffect(() => {
    const fetchDetail = () => {
      axios.get(fetchUrl).then((response) => {
        response.data.forEach((event) => {
          event.imageLoading = true;
        });
        setPaperPresentationEvents(
          response.data.filter((x) => {
            return x.eventType === "PaperPresentation";
          })
        );
        setHackathonEvents(
          response.data.filter((x) => {
            return x.eventType === "Hackathon";
          })
        );
        setLoading(false);
      });
    };
    fetchDetail();
  }, [fetchUrl]);

  if (loading) {
    return (
      <div className="container mx-auto page-view">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto page-view">
      <Tabs value={currentView}>
        <TabsHeader className="bg-primary">
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className={`${value === currentView ? "" : "text-white"}`}
              onClick={() => setCurrentView(value)}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default MegaEvents;
