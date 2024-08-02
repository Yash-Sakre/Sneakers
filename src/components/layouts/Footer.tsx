import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Heart, X } from "lucide-react";
import { BsInstagram, BsLinkedin, BsTwitterX, BsYoutube } from "react-icons/bs";

type State = {
  getHelp: boolean;
  aboutNike: boolean;
  joinUs: boolean;
};

type Sections = {
  title: string;
  links: string[];
  stateKey: keyof State;
};

const Footer = () => {
  const [isOpen, setIsOpen] = useState<State>({
    getHelp: false,
    aboutNike: false,
    joinUs: false,
  });

  const sections: Sections[] = [
    {
      title: "Get Help",
      links: [
        "Order Status",
        "Shipping and Delivery",
        "Returns",
        "Payment Options",
        "Contact Us",
      ],
      stateKey: "getHelp",
    },
    {
      title: "About SNKRS.",
      links: ["News", "Careers", "Investors", "Sustainability"],
      stateKey: "aboutNike",
    },
    {
      title: "Join Us",
      links: ["SNKRS. App", "SNKRS. Club", "SNKRS. Hiking Club"],
      stateKey: "joinUs",
    },
  ];

  const handleToggle = (key: keyof State) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <footer className="text-white bg-black">
      <div className="container p-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col">
            <Link to={"#"} className="mb-4 text-lg font-anton">
              Find a Store
            </Link>
            <Link to={"#"} className="mb-4 text-lg font-anton">
              Journal
            </Link>
            <Link to={"#"} className="mb-4 text-lg font-anton">
              Become a Member
            </Link>
            <Link to={"#"} className="mb-4 text-lg font-anton">
              Feedback
            </Link>
            <Link to={"#"} className="mb-4 text-lg font-anton">
              Promo Codes
            </Link>
          </div>
          {sections.map((section, index) => (
            <div key={index}>
              <h4
                className="flex justify-between w-full mb-4 font-bold cursor-pointer lg:hidden"
                onClick={() => handleToggle(section.stateKey)}
              >
                {section.title}{" "}
                <span>{isOpen[section.stateKey] ? "-" : "+"}</span>
              </h4>
              {isOpen[section.stateKey] && (
                <motion.ul
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  className="flex flex-col gap-2 overflow-hidden lg:hidden"
                >
                  {section.links.map((link, i) => (
                    <li key={i}>{link}</li>
                  ))}
                </motion.ul>
              )}
              <div className="hidden lg:block ">
                <h4 className="mb-4 font-bold">{section.title}</h4>
                <div className="flex flex-col gap-2">
                  {section.links.map((link, i) => (
                    <Link to={"#"} key={i}>
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div>
            <h4 className="mb-4 font-bold">Social</h4>
            <ul className="flex space-x-4">
              <li>
                <a href="#">
                  <BsTwitterX size={25} />
                </a>
              </li>
              <li>
                <a href="#">
                  <BsInstagram size={25} />
                </a>
              </li>
              <li>
                <a href="#">
                  <BsLinkedin size={25} />
                </a>
              </li>
              <li>
                <a href="#">
                  <BsYoutube size={25} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 mt-10 text-sm border-t border-gray-700 md:flex-row">
          <div className="flex flex-col md:flex-row md:space-x-4">
            {[
              "India",
              "Guides",
              "Terms of Use",
              "Terms of Sale",
              "Company Details",
              "Modern Slavery Act",
              "Privacy & Cookie Policy",
              "Cookie Settings",
            ].map((link, index) => (
              <a href="#" className="mb-2 md:mb-0" key={index}>
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            Made with <Heart fill="red" stroke="red" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
