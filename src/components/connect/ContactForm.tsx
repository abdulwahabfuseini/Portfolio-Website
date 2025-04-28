"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import toast from "react-hot-toast";


const ContactForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleSubmit = () => {
    setLoading(true);
    emailjs
      .send(
        "service_mon6fae",
        "template_42kwqac",
        {
          name: contact.name,
          email: contact.email,
          phoneNumber: contact.phoneNumber,
          message: contact.message,
        },
        "9vSC2INYrwofrkKDo"
      )
      .then(
        () => {
          setLoading(false);
          toast.success(
            "Thanks for your message, I will get back to you as soon as possible. Stay Bless!!!"
          );
          setContact({
            name: "",
            email: "",
            phoneNumber: "",
            message: "",
          });
          form.resetFields();
        },
        (error) => {
          setLoading(false);
          toast.error("oops!!! Something went wrong");
        }
      );
  };

  return (
    <div className="w-full h-full py-5">
      <motion.div
        initial="hidden"
        whileInView={"show"}
        variants={fadeIn("up", 0.4)}
      >
        <h1 className="pb-4 text-2xl text-center capitalize">
          Leave a message for me
        </h1>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please Enter Full Name",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Enter Full Name"
              name="name"
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              style={{ background: "white" }}
              className="w-full h-12 text-lg cursor-pointer border-neutral-400"
              type="text"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please Enter email",
              },
              { type: "email" },
            ]}
            hasFeedback
          >
            <Input
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              style={{ background: "white" }}
              className="w-full h-12 text-lg cursor-pointer border-neutral-400"
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please Enter Phone Number",
              },
            ]}
            hasFeedback
          >
            <Input
              type="tel"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              onChange={(e) =>
                setContact({ ...contact, phoneNumber: e.target.value })
              }
              style={{ background: "white" }}
              className="w-full h-12 py-2 text-lg cursor-pointer border-neutral-400"
            />
          </Form.Item>
          <Form.Item
            name="message"
            rules={[
              {
                required: true,
                message: "Please Enter message",
              },
            ]}
          >
            <TextArea
              placeholder="Leave a message for me"
              name="message"
              onChange={(e) =>
                setContact({ ...contact, message: e.target.value })
              }
              style={{ background: "white" }}
              className="w-full py-2 text-lg cursor-pointer border-neutral-400"
            />
          </Form.Item>
          <Button
            htmlType="submit"
            disabled={loading}
            loading={loading}
            type="primary"
            className="w-full h-12 my-4 text-xl cursor-pointer light-background disabled:text-white  disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </Form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
