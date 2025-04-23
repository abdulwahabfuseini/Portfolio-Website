"use client";

import { Button, Form, Input, Select } from "antd";
import emailjs from "@emailjs/browser";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  companyAddress: string;
  budget:
    | "GH₵ 2,000.00 - GH₵ 5,000.00"
    | "GH₵ 5,000.00 - GH₵ 10,000.00"
    | "GH₵ 10,000.00 And Above";
  detail: string;
}

const HireForm = () => {
  const [form] = useForm<FormData>();
  const [hireDetails, setHireDetails] = useState();
  const [selectBudget, setSelectedBudget] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  console.log("🚀 ~ ContactForm ~ hireDetails:", hireDetails);
  const handleSubmit = async (values: Omit<FormData, "image">) => {
    setLoading(true);
    try {
      const formattedPhoneNumber = formatPhoneNumber(values.phoneNumber);

      const formDataToSend = new FormData();
      formDataToSend.append("fullName", values.fullName);
      formDataToSend.append("phoneNumber", values.phoneNumber);
      formDataToSend.append("email", values.email);
      formDataToSend.append("budget", values.budget);
      formDataToSend.append("companyName", values.companyName);
      formDataToSend.append("companyAddress", values.companyAddress);
      formDataToSend.append("detail", values.detail);

      const response = await fetch("/api/projects", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        // toast.error(`Error: ${errorData.message || "Unknown error occurred"}`);
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      form.resetFields();

      setSelectedBudget(null);
    } catch (error) {
      console.error("Submit Error:", error); // Log the full error
      // toast.error(
      //   error instanceof Error
      //     ? error.message
      //     : "An unexpected error occurred during submission."
      // );
    } finally {
      setLoading(false);
    }
  };

  const handleBudgetChange = (value: string) => {
    setSelectedBudget(value);

    if (value === "real estate" || value === "lands") {
      form.resetFields(["condition"]);
    }
  };

  const formatPhoneNumber = (number: string): string => {
    if (!number) return "";
    const cleanedNumber = number.replace(/\D/g, "");
    if (cleanedNumber.length === 12 && cleanedNumber.startsWith("233")) {
      return `+${cleanedNumber.substring(0, 3)} ${cleanedNumber.substring(
        3,
        5
      )} ${cleanedNumber.substring(5, 8)} ${cleanedNumber.substring(8)}`;
    } else if (cleanedNumber.length === 10 && cleanedNumber.startsWith("0")) {
      return `+233 ${cleanedNumber.substring(1, 3)} ${cleanedNumber.substring(
        3,
        6
      )} ${cleanedNumber.substring(6)}`;
    } else {
      return number;
    }
  };

  return (
    <div className=" max-w-lg mx-auto">
      <Form
        onFinish={handleSubmit}
        form={form}
        className="py-16 lg:py-6 grid grid-cols-2 gap-x-2"
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
            { min: 8, max: 30 },
          ]}
          hasFeedback
        >
          <Input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            className="h-11 px-3  border-2 text-base rounded border-none"
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
            { min: 10 },
          ]}
          hasFeedback
        >
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="(000) 000 000 0000"
            className="h-11 px-3  border-2 text-base rounded border-none"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Email Address
            </span>
          }
          name="email"
          className="text-lg font-semibold col-span-2"
          rules={[
            { required: true, message: "Please Enter Email Address" },
            { type: "email" },
          ]}
          hasFeedback
        >
          <Input
            type="email"
            name="email"
            placeholder="Eg: myname@gmail.com"
            className="h-11 px-3  border-2 text-base rounded border-none"
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
        >
          <Input
            type="text"
            name="companyName"
            placeholder="Enter Comapany Name"
            className="h-11 px-3  border-2 text-base rounded border-none"
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
        >
          <Input
            type="text"
            name="companyAddress"
            placeholder="Enter Comapany Address"
            className="h-11 px-3  border-2 text-base rounded border-none"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">Budget</span>
          }
          name="category"
          rules={[{ required: true, message: "Select a Budget!" }]}
          className=" col-span-2"
        >
          <Select
            style={{
              height: 45,
              fontSize: 16,
              textAlign: "left",
            }}
            className="w-full border-2 text-base rounded-lg h-11 border-none"
            placeholder="Select a Budget"
            onChange={handleBudgetChange}
            options={[
              {
                value: "GH₵ 2,000.00 - GH₵ 5,000.00",
                label: "GH₵ 2,000.00 - GH₵ 5,000.00",
              },
              {
                value: "GH₵ 5,000.00 - GH₵ 10, 000.00",
                label: "GH₵ 5,000.00 - GH₵ 10, 000.00",
              },
              {
                value: "GH₵ 10,000.00 And More",
                label: "GH₵ 10,000.00 And More",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="detail"
          label={
            <span className="text-base font-semibold text-white">Details</span>
          }
          className="text-lg font-semibold col-span-2"
          rules={[
            { required: true, message: "Please Describe Project" },
            { min: 20, max: 100 },
          ]}
        >
          <TextArea
            name="detail"
            placeholder="Describe your project"
            className=" px-3  border-2 text-base rounded border-none"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="mt-2 text-xl text-white border-none green-background rounded h-12 w-full font-semibold hover:shadow-md"
        >
          {loading ? <h1>Sending Project...</h1> : "Submit Project"}
        </Button>
      </Form>
    </div>
  );
};

export default HireForm;
