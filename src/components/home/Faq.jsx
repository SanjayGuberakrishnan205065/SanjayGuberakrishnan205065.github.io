import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";

const FAQS = [
  {
    title: "1. How do I register for the SAMHITA 2024?",
    desc: "You may enroll for SAMHITA by utilizing the buy-tickets feature available on the website. Acquire tickets to gain entry to particular events or a bundle of events. Additionally, registration is mandatory for accommodation.",
  },
  {
    title: "2. What are the registration fees, and what is included?",
    desc: "Each event type has a distinct registration fee; please visit the buy-tickets page to review the prices for individual events.",
  },
  {
    title: "3. Will there be on-site registration available?",
    desc: "Certainly! On-site registration will be available, but we highly recommend registering online for your convenience and to avoid long queues.",
  },
];

function Faq() {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center">
          <Typography variant="h1" color="white" className="mb-4">
            Frequently asked questions
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto mb-24 lg:w-3/5 !text-gray-500"
          >
            Welcome to the Samhita 2024 FAQ section. We&apos;re here to address
            your most common queries and provide you with the information you
            need
          </Typography>
        </div>

        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {FAQS.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              onClick={() => handleOpen(key + 1)}
            >
              <AccordionHeader
                className={`text-left ${
                  open === key + 1
                    ? "text-gray-500 hover:!text-gray-100"
                    : "text-gray-200 hover:!text-gray-100"
                }`}
              >
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography className="font-normal text-gray-200">
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
