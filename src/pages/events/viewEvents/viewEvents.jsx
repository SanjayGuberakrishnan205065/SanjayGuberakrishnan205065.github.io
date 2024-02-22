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
import { useSearchParams } from "react-router-dom";

const ViewEvents = () => {
  const fetchUrl = "/api/events/upcoming-events";
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const [currentView, setCurrentView] = useState(
    params.get("type") || "Technical"
  );
  const [technicalEvents, setTechnicalEvents] = useState([]);
  const [nonTechnicalEvents, setNonTechnicalEvents] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
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
    ]);
  }, [technicalEvents, nonTechnicalEvents]);

  useEffect(() => {
    const fetchDetail = () => {
      axios.get(fetchUrl).then((response) => {
        response.data.forEach((event) => {
          event.imageLoading = true;
        });
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
