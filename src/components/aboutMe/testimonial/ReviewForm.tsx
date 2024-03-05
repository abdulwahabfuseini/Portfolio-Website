"use client";

import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const ReviewForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    description: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (res.ok) {
        form.resetFields();
      }
    } catch (error) {
      alert("Oooop!!! Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h1 className="py-6 text-xl font-bold text-center">
        Say Something About Me
      </h1>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "FullName Field is Required" }]}
          hasFeedback
          className="text-lg text-blue-500"
        >
          <Input
            name="fullName"
            type="text"
            style={{ background: "white" }}
            placeholder="Enter FullName"
            onChange={(e) =>
              setUserDetails({ ...userDetails, fullName: e.target.value })
            }
            className="h-12 text-lg text-white border-2 border-green-500"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email Field is Required" },
            { type: "email" },
          ]}
          hasFeedback
          className="text-lg"
        >
          <Input
            name="email"
            type="text"
            placeholder="Enter FullName"
            style={{ background: "white" }}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            className="h-12 text-lg border-2 border-green-500"
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Description Field is Required" }]}
          hasFeedback
          className="text-lg"
        >
          <TextArea
            name="description"
            placeholder="Say Something About Me"
            style={{ background: "white" }}
            onChange={(e) =>
              setUserDetails({ ...userDetails, description: e.target.value })
            }
            className="text-lg border-2 border-green-500"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          disabled={loading}
          type="primary"
          className="h-12 text-lg font-semibold light-background"
        >
          {loading ? <span>Loading...</span> : "Submit Review"}
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;
