import React, { useState } from "react";
import { Input } from "antd";
import { lab_group } from "./CPE100_student_Group_set_new"; // Ensure the import path is correct

const { Search } = Input;

// Define the type for the student object
interface Student {
  group_number: number;
  student_id: number;
  student_name: string;
}

const GroupFinderPage: React.FC = () => {
  const [result, setResult] = useState<Student[] | null>(null);
  // const [lab_group_data, setLabGroup] = useState<Student[]>(lab_group);

  const handleSearch = (value: string) => {
    if (value === "") {
      setResult(null);
      return;
    }
    const searchResult = lab_group.filter(
      (student) =>
        student.student_id.toString().includes(value) ||
        student.student_name.toLowerCase().includes(value.toLowerCase())
    );
    setResult(searchResult);
  }

  return (
    <div className="flex flex-col justify-center w-full min-h-screen">
      <div className="flex flex-col justify-center items-center gap-y-8">
        <p className="text-4xl font-bold text-center">Group Finder</p>
        <Search
          className="w-1/2"
          size="large"
          placeholder="Enter your student ID or name"
          onSearch={handleSearch}
        />
        <div className="">
          {result?.length != 0 ? (
            result?.map((item, index) => (
              <p key={index} className="text-lg text-center mt-4">
                <span className="font-bold">Group Number:</span>{" "}
                {item.group_number}
                <br />
                <span className="font-bold">Student ID:</span> {item.student_id}
                <br />
                <span className="font-bold">Student Name:</span>{" "}
                {item.student_name}
              </p>
            ))
          ) : (
            <p className="text-lg text-center mt-4">No results found</p>
          )}
        </div>
        {/* {result ? (
          result.map((item, index) => (
            <p key={index} className="text-lg text-center mt-4">
              <span className="font-bold">Group Number:</span>{" "}
              {item.group_number}
              <br />
              <span className="font-bold">Student ID:</span> {item.student_id}
              <br />
              <span className="font-bold">Student Name:</span>{" "}
              {item.student_name}
            </p>
          ))
        ) : (
          <p className="text-lg text-center mt-4">No results found</p>
        )} */}
      </div>
    </div>
  );
};

export default GroupFinderPage;
