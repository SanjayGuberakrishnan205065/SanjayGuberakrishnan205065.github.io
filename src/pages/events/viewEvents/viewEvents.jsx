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

const ViewEvents = ({ category }) => {
  let fetchUrl;
  switch (category) {
    case "ARCHIVES":
      fetchUrl = "/api/events/archives";
      break;
    case "UPCOMING":
      fetchUrl = "/api/events/upcoming-events";
      break;
    default:
      fetchUrl = "/api/events/upcoming-events";
  }
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [currentView, setCurrentView] = useState("Technical");
  const [technicalEvents, setTechnicalEvents] = useState([]);
  const [nonTechnicalEvents, setNonTechnicalEvents] = useState([]);

  const data = [
    {
      label: "Technical Events",
      value: "Technical",
      desc: <EventsList events={technicalEvents} />,
    },
    {
      label: "Non-technical Events",
      value: "Non-technical",
      desc: <EventsList events={nonTechnicalEvents} />,
    },
  ];

  useEffect(() => {
    const fetchDetail = () => {
      axios.get(fetchUrl).then((response) => {
        response.data.forEach((event) => {
          event.imageLoading = true;
        });
        console.log(response.data);
        setDetail(response.data);
        setTechnicalEvents(
          response.data.filter((x) => {
            return x.eventType === "Technical";
          })
        );
        setNonTechnicalEvents(
          response.data.filter((x) => {
            return x.eventType === "Non-technical";
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

export default ViewEvents;
