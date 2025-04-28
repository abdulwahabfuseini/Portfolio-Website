"use client";

import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ProjectRequest from "./ProjectRequest";

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Watch the value of the phoneNumber field from the form state
  const phoneNumberValue = Form.useWatch("phoneNumber", form);

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    try {
      console.log("Submitting Phone Number:", values.phoneNumber);

      const formDataToSend = new FormData();
      formDataToSend.append("fullName", values.fullName);
      formDataToSend.append("phoneNumber", values.phoneNumber || "");
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
        // Prefer specific backend message for toast
        toast.error(
          result.message || `Submission failed: ${response.statusText}`
        );
        console.error("Submission Error Response:", result);
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`
        );
      }

      toast.success(result.message || "Project Submitted Successfully!");
      console.log("Submission Success:", result);
      setIsSubmitted(true);
      form.resetFields();
      setSelectedBudget(null);
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Submit Error:", error);
      // Avoid duplicate toasts if error originated from response check
      if (
        !(error instanceof Error && error.message?.startsWith("HTTP error!"))
      ) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during submission."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBudgetChange = (value: string) => {
    setSelectedBudget(value);
  };

  return (
    <div className="max-w-lg mx-auto pb-24 lg:pb-0">
      <Form
        onFinish={handleSubmit}
        form={form}
        className="pt-6 pb-4 lg:py-10 grid grid-cols-1 md:grid-cols-2 gap-x-4"
        layout="vertical"
      >
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Full Name
            </span>
          }
          name="fullName"
          rules={[
            { required: true, message: "Please Enter Full Name" },
            { min: 3, message: "Full name must be at least 3 characters" },
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
          rules={[
            { required: true, message: "Please Enter Phone Number" },
            {
              // Use string | undefined for the value type in the validator
              validator: async (_, value: string | undefined) => {
                if (!value) {
                  return Promise.reject(new Error("Phone Number is required"));
                }
                if (!isPossiblePhoneNumber(value)) {
                  return Promise.reject(
                    new Error("This phone number seems too short or too long")
                  );
                }
                if (!isValidPhoneNumber(value)) {
                  return Promise.reject(
                    new Error(
                      "Please enter a valid phone number for the selected country"
                    )
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
          hasFeedback
        >
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="GH"
            placeholder="Enter phone number"
            className="hire-form-phone-input"
            value={phoneNumberValue}
            onChange={(value: string | undefined) => {
              form.setFieldsValue({ phoneNumber: value });
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Email Address
            </span>
          }
          name="email"
          className="md:col-span-2"
          rules={[
            { required: true, message: "Please Enter Email Address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
          hasFeedback
        >
          <Input
            type="email"
            placeholder="Eg: myname@gmail.com"
            className="h-11 px-3 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Company Name (Optional)
            </span>
          }
          name="companyName"
          rules={[
            { max: 100, message: "Company name cannot exceed 100 characters" },
          ]}
        >
          <Input
            type="text"
            placeholder="Enter Company Name"
            className="h-11 px-3 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Company Address (Optional)
            </span>
          }
          name="companyAddress"
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
            className="h-11 px-3 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-semibold text-white">
              Your Budget
            </span>
          }
          name="budget"
          rules={[{ required: true, message: "Select a Budget!" }]}
          className="md:col-span-2"
        >
          <Select
            style={{ height: 45, fontSize: 16 }}
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
          className="md:col-span-2" // Apply span styling directly
          rules={[
            { required: true, message: "Please Describe Your Project" },
            { min: 20, message: "Details must be at least 20 characters" },
            { max: 1000, message: "Details cannot exceed 1000 characters" },
          ]}
        >
          <TextArea
            placeholder="Describe your project requirements, goals, timeline, etc."
            rows={4}
            className="px-3 py-2 border-gray-300 border text-base rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item className="mt-4">
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            disabled={loading}
            className="text-lg text-white border-none green-background rounded h-12 w-full font-semibold hover:shadow-md disabled:cursor-not-allowed disabled:text-white"
          >
            {loading ? "Submitting Project..." : "Submit Project"}
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Your Project Is Submitted!"
        open={successModalVisible}
        closable={true}
        onCancel={() => {
          setSuccessModalVisible(false);
          setIsSubmitted(false);
        }}
        footer={null}
        width={400}
        centered
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <ProjectRequest />
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={() => {
              setSuccessModalVisible(false);
              setIsSubmitted(false);
            }}
            className="text-lg text-white border-none green-background rounded h-10 font-semibold hover:shadow-md"
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default HireForm;
