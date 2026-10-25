export const homeProcess = [
  {
    index: "01",
    title: "Discover",
    text: "We understand your business, audience, and objectives.",
  },
  {
    index: "02",
    title: "Plan",
    text: "We define the project scope, features, and strategy.",
  },
  {
    index: "03",
    title: "Build",
    text: "We design and develop a solution around your requirements.",
  },
  {
    index: "04",
    title: "Launch",
    text: "We test the solution and prepare it for launch.",
  },
  {
    index: "05",
    title: "Improve",
    text: "We identify opportunities for future enhancements and growth.",
  },
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Discover",
    summary: "We learn about your business, target audience, objectives, requirements, and challenges.",
    detail:
      "The first conversation is about the business itself: who it serves, what it needs to achieve, and what is getting in the way.",
    points: ["Your business", "Target audience", "Objectives and requirements", "Current challenges"],
  },
  {
    index: "02",
    title: "Plan",
    summary: "We define the scope, deliverables, features, timeline, and project priorities.",
    detail: "The plan names what the project includes and the order in which it will be done.",
    points: ["Scope and deliverables", "Features", "Timeline", "Project priorities"],
  },
  {
    index: "03",
    title: "Design",
    summary: "Where applicable, we plan the user experience and create a visual direction aligned with your brand.",
    detail: "Design is used when the project needs a path through the product and a visual direction that fits the brand.",
    points: ["User experience", "Visual direction", "Alignment with the brand"],
  },
  {
    index: "04",
    title: "Develop",
    summary: "We build the website or application according to the agreed requirements and project scope.",
    detail: "Development follows the requirements and scope already agreed.",
    points: ["The website or application", "Agreed requirements", "Agreed project scope"],
  },
  {
    index: "05",
    title: "Test and Launch",
    summary:
      "We check functionality, responsiveness, usability, and relevant technical requirements before launch.",
    detail: "The solution is checked against the requirements that matter for launch.",
    points: ["Functionality", "Responsiveness", "Usability", "Relevant technical requirements"],
  },
  {
    index: "06",
    title: "Improve",
    summary:
      "Depending on the agreed services, we provide support, maintenance, performance reviews, or recommendations for future improvements.",
    detail: "Further work happens when it is part of the agreed services.",
    points: ["Support and maintenance", "Performance reviews", "Recommendations for future improvements"],
  },
] as const;
