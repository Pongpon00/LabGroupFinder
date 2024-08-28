import React, { useState } from "react";
import { Input, Select, Table, TableProps } from "antd";

const { Search } = Input;

interface Student {
  group_number: number;
  student_id: number;
  student_name: string;
}

type LabGroupType =
  | { lab_group_1: Student[]; lab_group_2?: undefined }
  | { lab_group_2: Student[]; lab_group_1?: undefined };

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
  const assignmentOptions = [{ label: "Assignment 2", value: "Assignment 2" }];

  const groupOptions = Array.from({ length: 20 }, (_, i) => ({
    label: `Group ${i + 1}`,
    value: i + 1,
  }));

  const [result, setResult] = useState<Student[] | null>(null);
  const [onSearch, setOnSearch] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [labGroupData, setLabGroupData] = useState<LabGroupType | null>(null);

  const handleGroupSelect = (value: number | undefined) => {
    if (value === undefined) {
      setSelectedGroup(null);
      setResult(null);
      return;
    }
    setSelectedGroup(value);

    if (labGroupData?.lab_group_1) {
      const filtered = labGroupData.lab_group_1.filter(
        (item) => item.group_number === value
      );
      setResult(filtered);
    } else if (labGroupData?.lab_group_2) {
      const filtered = labGroupData.lab_group_2.filter(
        (item) => item.group_number === value
      );
      setResult(filtered);
    }
  };

  const handleOnSearch = (value: string) => {
    setOnSearch(value);
    setSelectedGroup(null); // Clear group selection when searching by name or ID

    if (labGroupData?.lab_group_1) {
      const filtered = labGroupData.lab_group_1.filter(
        (item) =>
          item.student_id.toString().includes(value) ||
          item.student_name.toLowerCase().includes(value.toLowerCase())
      );
      setResult(filtered);
    } else if (labGroupData?.lab_group_2) {
      const filtered = labGroupData.lab_group_2.filter(
        (item) =>
          item.student_id.toString().includes(value) ||
          item.student_name.toLowerCase().includes(value.toLowerCase())
      );
      setResult(filtered);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full min-h-screen">
      <p className="text-4xl font-bold text-center py-6">Group Finder</p>
      <div className="flex flex-col justify-center items-center gap-y-4">
        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-4 w-3/4 sm:w-1/2 justify-center items-center">
          <Select
            className="flex w-full"
            size="large"
            allowClear
            placeholder="Select Assignment"
            options={assignmentOptions}
          />
          <Select
            disabled={onSearch !== ""} // Disable if there's any search input
            className="flex w-full"
            size="large"
            allowClear
            placeholder="Select Group"
            options={groupOptions}
            onChange={handleGroupSelect}
          />
        </div>
        <Search
          disabled={selectedGroup !== null} // Disable if a group is selected
          className="w-3/4 sm:w-1/2"
          size="large"
          placeholder="Enter your student ID or name"
          onSearch={handleOnSearch}
          onChange={(e) => handleOnSearch(e.target.value)}
        />
        <div className="w-3/4 sm:w-1/2 overflow-scroll bg-slate-200 rounded-xl">
          {result && (
            <Table
              className="p-2"
              columns={columns}
              dataSource={result}
              pagination={false}
              scroll={{ y: 420 }}
              rowKey="student_id"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupFinderPage;
