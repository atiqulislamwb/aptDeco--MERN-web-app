import React from "react";
import { Helmet } from "react-helmet";

const data = [
  {
    id: 1,
    post: "26 Oct,2022",
    comment: "150",
    like: "7.1k",
    image: "https://miro.medium.com/max/1400/1*mjbPUUeSgPTgg3M1gic_xA.png",
    question:
      " What are the different ways to manage a state in a React application ?",
    answer:
      "The Four Kinds of React State to Manage Local state. Global state. Server state. URL state.Local (UI) state – Local state is data we manage in one or another component. Global (UI) state – Global state is data we manage across multiple components.Server state – Data that comes from an external server that must be integrated with our UI state.URL state – Data that exists on our URLs, including the pathname and query parameters. ",
  },
  {
    id: 2,
    post: "25 Nov,2022",
    comment: "100",
    like: "3.6k",
    image: "https://miro.medium.com/max/1042/1*ULmG2uiAlgQksjj-brp2fw.jpeg",
    question: "How does prototypical inheritance work ? ",
    answer:
      "The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.",
  },
  {
    id: 3,
    post: "21 Nov,2022",
    comment: "71",
    like: "2.2k",
    image: "https://i.ytimg.com/vi/lj5nnGa_DIw/maxresdefault.jpg",
    question: " What is a unit test? Why should we write unit tests ?",
    answer:
      "The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.",
  },
  {
    id: 4,
    post: "22 Nov,2022",
    comment: "50",
    like: "3.2k",
    image:
      "https://presence.agency/wp-content/uploads/2020/07/1_lC1kj3IeXoE8Z3OCKJoWkw.jpeg",
    question: " React vs. Angular vs. Vue ?",
    answer:
      "This post is a comprehensive guide on which is perhaps the right solution for you: Angular vs React vs Vue. Just a couple of years ago, developers were mainly debating whether they should be using Angular vs React for their projects. But over the course of the last couple of years, we’ve seen a growth of interest in a third player called Vue.js.  If you are a developer starting out on a project and cannot decide on which JavaScript framework to use, this guide should help you make a decision.Angular, developed by Google, was first released in 2010, making it the oldest of the lot. It is a TypeScript-based JavaScript framework.Vue, also known as Vue.js, is the youngest member of the group. It was developed by ex-Google employee Evan You in 2014.React, developed by Facebook, was initially released in 2013. Facebook uses React extensively in their products (Facebook, Instagram, and WhatsApp). ",
  },
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog page - aptDeco</title>
      </Helmet>
      <div className="grid gap-5 mt-5 p-4 sm:p-0 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {data?.map((item) => (
          <div
            key={item.id}
            className="overflow-auto p-3 transition-shadow duration-300 bg-white rounded"
          >
            <a aria-label="Article">
              <img
                src={item?.image}
                className="object-contain w-full h-64 rounded"
                alt=""
              />
            </a>
            <div className="py-5">
              <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                {item?.post}
              </p>
              <a
                aria-label="Article"
                className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                <p className="text-2xl font-bold leading-5">{item?.question}</p>
              </a>
              <p className="mb-4 text-gray-700">{item?.answer}</p>

              <div className="flex space-x-4">
                <a
                  aria-label="Likes"
                  className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                >
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
                    >
                      <polyline
                        points="6 23 1 23 1 12 6 12"
                        fill="none"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold">{item?.like}</p>
                </a>
                <a
                  aria-label="Comments"
                  className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                >
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
                    >
                      <polyline
                        points="23 5 23 18 19 18 19 22 13 18 12 18"
                        fill="none"
                        strokeMiterlimit="10"
                      />
                      <polygon
                        points="19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold">{item.comment}</p>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;
