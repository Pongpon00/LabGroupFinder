import React, { useState } from "react";
import { Input, Table, TableProps } from "antd";
import { lab_group } from "./Assignment2Group";

const { Search } = Input;

interface Student {
  group_number: number;
  student_id: number;
  student_name: string;
}

const columns: TableProps<Student>["columns"] = [
  {
    title: "Group Number",
    dataIndex: "group_number",
    key: "group_number",
    width: 150,
  },
  {
    title: "Student ID",
    dataIndex: "student_id",
    key: "student_id",
    render: (text) => <a>{text}</a>,
    width: 200,
  },
  {
    title: "Name",
    dataIndex: "student_name",
    key: "student_name",
    render: (text) => <a>{text}</a>,
  },
];

const GroupFinderPage: React.FC = () => {
  // const groupOptions = Array.from({ length: 20 }, (_, i) => ({
  //   label: `Group ${i + 1}`,
  //   value: i + 1,
  // }));

  const [result, setResult] = useState<Student[]>([]);
  const [searchedStudent, setSearchedStudent] = useState<Student | null>(null);
  const [onSearch, setOnSearch] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  // const [selectedGroupMembers, setSelectedGroupMembers] = useState<Student[]>([]);

  // const handleGroupSelect = (value: number | undefined) => {
  //   setSelectedGroup(value || null);
  //   setOnSearch(""); // Clear any existing search input
    

  //   if (value !== undefined) {
  //     const filtered = lab_group.filter(
  //       (item) => item.group_number === value
  //     );
  //     setResult(filtered);
  //     setSearchedStudent(null); // Clear any existing searched student
  //     setOnSearch(""); // Clear any existing search input
  //   } else {
  //     setResult([]);
  //   }
  // };

  const handleOnSearch = (value: string) => {
    setOnSearch(value);
    setSelectedGroup(null); // Clear group selection when searching by name or ID

    // Find the student based on the search criteria
    const foundStudent = lab_group.find(
      (item) =>
        item.student_id.toString().includes(value) ||
        item.student_name.toLowerCase().includes(value.toLowerCase())
    );

    const result = lab_group.filter(
      (item) =>
        item.student_id.toString().includes(value) ||
        item.student_name.toLowerCase().includes(value.toLowerCase())
    );

    // setSelectedGroupMembers(result);

    if(selectedGroup !== null && value !== "") {
      // filter student name or ID in the selected group
      const groupMembers = lab_group.filter(
        (item) => item.group_number === selectedGroup
      );
      const filteredGroupMembers = groupMembers.filter(
        (item) =>
          item.student_id.toString().includes(value) ||
          item.student_name.toLowerCase().includes(value.toLowerCase())
      );
      setResult(filteredGroupMembers);
    }
    else if (selectedGroup === null && value === "") {
      setResult(result);
      setSearchedStudent(null); // Clear the searched student if the search input is empty
    }
    else if (foundStudent && selectedGroup === null) {
      // Get all members of the found student's group
      setSearchedStudent(foundStudent);
      const groupMembers = lab_group.filter(
        (item) => item.group_number === foundStudent.group_number
      );
      setResult(groupMembers);
    } 
    else {
      setResult([]);
      setSearchedStudent(null); // Clear the searched student if not found
    }
  };

  return (
    <div className="flex flex-col justify-center w-full min-h-screen">
      <p className="text-4xl font-bold text-center py-6">Group Finder</p>
      <div className="flex flex-col justify-center items-center gap-y-4">
        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-4 w-3/4 sm:w-1/2 justify-center items-center">
          {/* <Select
            // disabled={onSearch !== ""} // Disable if there's any search input
            className="flex w-full"
            size="large"
            allowClear
            placeholder="Select Group"
            options={groupOptions}
            onChange={handleGroupSelect}
            // value={selectedGroup}
          /> */}
        </div>
        <Search
          // disabled={selectedGroup !== null} // Disable if a group is selected
          className="w-3/4 sm:w-1/2"
          size="large"
          placeholder="Enter your student ID or name"
          value={onSearch}
          onSearch={handleOnSearch}
          onChange={(e) => handleOnSearch(e.target.value)}
        />
        <div className="w-3/4 sm:w-1/2 overflow-scroll bg-slate-200 rounded-xl">
          {result.length > 0 && (
            <Table
              className="p-2"
              columns={columns}
              dataSource={result}
              pagination={false}
              scroll={{ y: 420 }}
              rowKey="student_id"
              // Highlight the row if it matches the searched student
              rowClassName={(record) =>
                searchedStudent && record.student_id === searchedStudent.student_id
                  ? "bg-yellow-300"
                  : ""
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupFinderPage;
