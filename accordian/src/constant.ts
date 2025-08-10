export interface AccordionData {
  id: number;
  title: string;
  content: string;
}

export const data: AccordionData[] = [
  {
    id: 1,
    title: "What is React?",
    content: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: 2,
    title: "What is a component?",
    content: "Components are the building blocks of a React application.",
  },
  {
    id: 3,
    title: "What is state?",
    content:
      "State is a built-in object that stores property values that belong to a component.",
  },
  {
    id: 4,
    title: "What is a prop?",
    content: "Props are arguments passed into React components.",
  },
  {
    id: 5,
    title: "What is JSX?",
    content:
      "JSX is a syntax extension for JavaScript that looks similar to XML or HTML.",
  },
  {
    id: 6,
    title: "What is a hook?",
    content:
      "Hooks are functions that let you use state and other React features without writing a class.",
  },
];
