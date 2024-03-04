export const checkoutIdEventMap = {
  tech_pass: "Technical Event",
  non_tech_pass: "Non Technical Event",
  adobe_workshop: "Adobe Workshop",
  guvi_workshop_course: "Guvi Workshop",
  hackathon_pass: "Hackathon",
  microsoft_workshop: "Microsoft Workshop",
  paper_presentation_pass: "Paper Presentation",
  tekion_workshop: "Tekion Workshop",
  walmart_workshop: "Walmart Workshop",
  well_fargo_workshop: "Well Fargo Workshop",
  accommodation_24hrs: "Accommodation 24hrs with food",
  accommodation_24hrs_no_food: "Accommodation 24hrs without food",
  accommodation_48hrs: "Accommodation 48hrs with food",
  accommodation_48hrs_no_food: "Accommodation 48hrs without food",
};

export const comboEventCheckoutIdsMap = {
  adobe_guvi_workshop: ["adobe_workshop", "guvi_workshop_course"],
  adobe_tekion_workshop: ["adobe_workshop", "tekion_workshop"],
  adobe_wells_fargo_workshop: ["adobe_workshop", "well_fargo_workshop"],
  general_event_pass: ["tech_pass", "non_tech_pass"],
  microsoft_guvi_workshop: ["microsoft_workshop", "guvi_workshop_course"],
  microsoft_tekion_workshop: ["microsoft_workshop", "tekion_workshop"],
  microsoft_wells_fargo_workshop: ["microsoft_workshop", "well_fargo_workshop"],
  walmart_guvi_workshop: ["walmart_workshop", "guvi_workshop_course"],
  walmart_tekion_workshop: ["walmart_workshop", "tekion_workshop"],
  walmart_wells_fargo_workshop: ["walmart_workshop", "well_fargo_workshop"],
};
