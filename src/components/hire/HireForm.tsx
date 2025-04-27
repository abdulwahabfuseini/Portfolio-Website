"use client";

import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName?: string;
  companyAddress?: string;
  budget:
    | "GH₵ 2,000.00 - GH₵ 5,000.00"
    | "GH₵ 5,000.00 - GH₵ 10,000.00"
    | "GH₵ 10,000.00 And Above";
  detail: string;
}

const HireForm = () => {
  const [form] = useForm<FormData>();
  const [selectBudget, setSelectedBudget] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormData) => {
    // Use FormData type directly
    setLoading(true);
    try {
      const formattedPhoneNumber = formatPhoneNumber(values.phoneNumber);

      // Using FormData API to send data
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", values.fullName);
      formDataToSend.append("phoneNumber", formattedPhoneNumber);
      formDataToSend.append("email", values.email);
      formDataToSend.append("budget", values.budget);
      if (values.companyName) {
        formDataToSend.append("companyName", values.companyName);
      }
      if (values.companyAddress) {
        formDataToSend.append("companyAddress", values.companyAddress);
      }
      formDataToSend.append("detail", values.detail);

      const response = await fetch("/api/projects", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(`Error: ${result.message || "Submission failed"}`);
        console.error("Submission Error Response:", result);
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`
        );
      }

      toast.success(result.message || "Project Submitted Successfully!");
      console.log("Submission Success:", result);
      form.resetFields();
      setSelectedBudget(null);
    } catch (error) {
      console.error("Submit Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during submission."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBudgetChange = (value: string) => {
    setSelectedBudget(value);
  };

  // Keep the phone number formatting function
  const formatPhoneNumber = (number: string): string => {
    if (!number) return "";
    const cleanedNumber = number.replace(/\D/g, ""); // Remove non-digits
    // Ghana format (+233 XX XXX XXXX or +233 X XXX XXXX) from 0XXXXXXXXX or 233XXXXXXXXX
    if (cleanedNumber.length === 12 && cleanedNumber.startsWith("233")) {
      // Already includes country code
      return `+${cleanedNumber.substring(0, 3)} ${cleanedNumber.substring(
        3,
        5
      )} ${cleanedNumber.substring(5, 8)} ${cleanedNumber.substring(8)}`;
    } else if (cleanedNumber.length === 10 && cleanedNumber.startsWith("0")) {
      // Starts with 0, add +233
      return `+233 ${cleanedNumber.substring(1, 3)} ${cleanedNumber.substring(
        3,
        6
      )} ${cleanedNumber.substring(6)}`;
    } else if (cleanedNumber.length === 9 && !cleanedNumber.startsWith("0")) {
      // Assumes 9 digits without leading 0, prepend +233
      return `+233 ${cleanedNumber.substring(0, 2)} ${cleanedNumber.substring(
        2,
        5
      )} ${cleanedNumber.substring(5)}`;
    }

    return number.startsWith("+") ? number : `+${cleanedNumber}`;
  };

  return (
    <div className="max-w-lg mx-auto pb-24 lg:pb-0">
      {" "}
      <Form
        onFinish={handleSubmit}
        form={form}
        className="pt-6 pb-4 lg:py-6 grid grid-cols-1 md:grid-cols-2 gap-x-4"
        layout="vertical"
      >
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Full Name
            </span>
          }
          name="fullName"
          className="text-lg font-semibold"
          rules={[
            { required: true, message: "Please Enter Full Name" },
            { min: 5, message: "Full name must be at least 5 characters" },
            { max: 50, message: "Full name cannot exceed 50 characters" },
          ]}
          hasFeedback
        >
          <Input
            type="text"
            placeholder="Enter Full Name"
            className="h-11 px-3 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label={
            <span className="text-base font-semibold text-white">
              Phone Number
            </span>
          }
          className="text-lg font-semibold"
          rules={[
            { required: true, message: "Please Enter Phone Number" },
            {
              pattern: /^(?:\+?233|0)[ -]?(\d{2}[ -]?\d{3}[ -]?\d{4}|\d{9})$/,
              message:
                "Enter a valid Ghanaian phone number (e.g., 024 XXX XXXX or +233 24 XXX XXXX)",
            },
          ]}
          hasFeedback
        >
          <Input
            type="tel"
            prefix="+233"
            placeholder="000 000 0000"
            className="h-11 px-3 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Email Address
            </span>
          }
          name="email"
          className="text-lg font-semibold md:col-span-2"
          rules={[
            { required: true, message: "Please Enter Email Address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
          hasFeedback
        >
          <Input
            type="email"
            placeholder="Eg: myname@gmail.com"
            className="h-11 px-3 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" // Improved styling
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Company Name (Optional)
            </span>
          }
          name="companyName"
          className="text-lg font-semibold"
          rules={[
            { max: 100, message: "Company name cannot exceed 100 characters" },
          ]}
        >
          <Input
            type="text"
            placeholder="Enter Company Name"
            className="h-11 px-3 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" // Improved styling
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Company Address (Optional)
            </span>
          }
          name="companyAddress"
          className="text-lg font-semibold"
          rules={[
            {
              max: 150,
              message: "Company address cannot exceed 150 characters",
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Enter Company Address"
            className="h-11 px-3 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" // Improved styling
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">Budget</span>
          }
          name="budget"
          rules={[{ required: true, message: "Select a Budget!" }]}
          className="md:col-span-2"
        >
          <Select
            style={{
              height: 45,
              fontSize: 16,
            }}
            className="w-full !border-gray-300 !border !text-base !rounded focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500"
            placeholder="Select a Budget"
            onChange={handleBudgetChange}
            options={[
              {
                value: "GH₵ 2,000.00 - GH₵ 5,000.00",
                label: "GH₵ 2,000.00 - GH₵ 5,000.00",
              },
              {
                value: "GH₵ 5,000.00 - GH₵ 10,000.00",
                label: "GH₵ 5,000.00 - GH₵ 10,000.00",
              },
              {
                value: "GH₵ 10,000.00 And Above",
                label: "GH₵ 10,000.00 And Above",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="detail"
          label={
            <span className="text-base font-semibold text-white">
              Project Details
            </span>
          }
          className="text-lg font-semibold md:col-span-2"
          rules={[
            { required: true, message: "Please Describe Your Project" },
            { min: 20, message: "Details must be at least 20 characters" },
            { max: 1000, message: "Details cannot exceed 1000 characters" },
          ]}
        >
          <TextArea
            placeholder="Describe your project requirements, goals, timeline, etc."
            rows={4}
            className="px-3 py-2 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500" // Improved styling
          />
        </Form.Item>
        <Form.Item className="mt-4">
          {" "}
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            disabled={loading}
            className="text-lg text-white border-none green-background rounded h-12 w-full font-semibold hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed" // Added disabled styles
          >
            {loading ? "Submitting Project..." : "Submit Project"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HireForm;
