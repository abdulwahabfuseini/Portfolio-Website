"use client";

import { useReviews } from "@/context/ReviewContext";
import { Comment } from "@/utils/Types";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ReviewForm = ({ closeDrawerReview }: any) => {
  const [form] = Form.useForm<Comment>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { fetchReviews } = useReviews();

  const handleSubmit = async (values: Comment) => {
    setLoading(true);
    console.log("Submitting values:", values);

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Review Submitted Successfully! Thanks for your review");
        form.resetFields();
        await fetchReviews();
        closeDrawerReview(); // Close the drawer after submission
      } else {
        throw new Error(
          result.message || `Request failed with status ${res.status}`
        );
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error(
        error.message || "Oooop!!! Something went wrong. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative py-16 max-w-lg mx-auto px-4">
      <h1 className="pb-6 text-xl font-bold text-center text-white">
        Say Something About Me
      </h1>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Full Name is Required" }]}
          hasFeedback
        >
          <Input
            type="text"
            placeholder="Enter Full Name"
            className="h-12 px-3 text-base border rounded border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is Required" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
          hasFeedback
        >
          <Input
            type="email"
            placeholder="Enter Email"
            className="h-12 px-3 text-base border rounded border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </Form.Item>
        <Form.Item
          name="occupation"
          rules={[{ required: true, message: "Occupation is Required" }]}
          hasFeedback
        >
          <Input
            type="text"
            placeholder="E.g: CEO, Client, Project Manager"
            className="h-12 px-3 text-base border rounded border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </Form.Item>
        <Form.Item
          name="rate"
          rules={[{ required: true, message: "Please rate the service!" }]}
        >
          <Select
            style={{ height: 45, fontSize: 16 }}
            className="w-full !border-green-500 !border !text-base !rounded focus:!border-green-500 focus:!ring-1 focus:!ring-green-500"
            placeholder="Select a Rating"
            options={[
              { value: "1 - Very Poor", label: "1 - Very Poor" },
              { value: "2 - Poor", label: "2 - Poor" },
              { value: "3 - Average", label: "3 - Average" },
              { value: "4 - Good", label: "4 - Good" },
              { value: "5 - Excellent", label: "5 - Excellent" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            { required: true, message: "Please provide a description" },
            { min: 10, message: "Description must be at least 10 characters" },
            { max: 500, message: "Description cannot exceed 500 characters" },
          ]}
          hasFeedback
        >
          <TextArea
            placeholder="Share your experience..."
            rows={2}
            className="px-3 py-2 text-base border rounded border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            disabled={loading}
            loading={loading}
            type="primary"
            className="w-full h-12 text-lg font-semibold light-background text-white disabled:text-white  disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
