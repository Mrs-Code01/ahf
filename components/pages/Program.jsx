import React from "react";

const Programs = ({ programs }) => {
  return (
    <div className="flex flex-wrap justify-between">
      {programs.map(program => (
        <div
          key={program.id}
          className="w-full lg:w-[31%] mb-10 bg-[#FAF9F6] rounded-[2rem] overflow-hidden shadow-sm border border-[black] border-[1px]"
        >
          <div className="w-full h-[280px] max-[1130px]:h-[230px] overflow-hidden">
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-6 mb-5">
              <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                <span className="text-[#E32227]">📅</span>
                {program.date}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                <span className="text-[#4169e1]">📍</span>
                {program.location}
              </div>
            </div>

            <h3 className="text-[2rem] font-bold text-[#1a1a1a] mb-4 leading-[1.1]">
              {program.title}
            </h3>

            <p className="text-gray-600 text-[15px] leading-[1.3]">
              {program.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Programs;
