import React from "react";

const TopSkills = () => {
  const skills = [
    {
      id: 1,
      skill: "Carpentry",
      description:
        "Expert craftsmanship in woodwork, framing, and custom furniture, delivering durable and high-quality results.",
    },
    {
      id: 2,
      skill: "Plumbing",
      description:
        "Professional plumbing services for installations, repairs, and maintenance, ensuring efficient water and drainage systems.",
    },
    {
      id: 3,
      skill: "Electrical Work",
      description:
        "Certified electricians for wiring, panel upgrades, lighting installations, and troubleshooting electrical issues.",
    },
    {
      id: 4,
      skill: "HVAC Installation & Repair",
      description:
        "Heating, ventilation, and air conditioning services to maintain comfort and energy efficiency in residential and commercial spaces.",
    },
    {
      id: 5,
      skill: "Roofing",
      description:
        "Reliable roofing services for installations, repairs, and inspections to protect properties from the elements.",
    },
    {
      id: 6,
      skill: "Masonry & Concrete Work",
      description:
        "Specialized in brickwork, stonework, and concrete construction, providing strong and lasting structures.",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-4">
      <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">Top Skills</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {skills.map((element) => {
          return (
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={element.id}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-4">{element.skill}</h4>
              <p className="text-gray-600">{element.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopSkills;
