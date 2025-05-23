export type ButtonProps = {
  url: string;
  text: string;
};

export type HeadProps = {
  title: string;
  text: string;
};

export type SkillProps = {
  icon: string;
  index: number;
};

export type ServiceProps = {
  id: string;
  title: string;
  gif: string;
  desc: string;
};

export type PriceProps = {
  title: string;
  amount: number;
  service: { plan: string }[];
};

export type ProjectProps = {
  link: string;
  code: string;
  imgUrl: string;
  projectName: string;
  connect: string;
  desc: string;
  tools: { tool: string }[];
};

export type CardProps = {
  id: number;
  imgUrl: string;
  projectName: string;
  link: string;
};

export type Comment = {
  id?: string;
  fullName: string;
  email: string;
  rate: string;
  occupation: string;
  description: string;
};

export type ChooseProps = {
  id: number;
  title: string;
  icon: string;
  desc: string;
};

export type FadeIn = {
  hidden: {
    x: number;
    y: number;
    opacity: number;
  };
  show: {
    x: number;
    y: number;
    opacity: number;
    transition: {
      type: string;
      delay: number;
      duration: number;
      ease: number[];
    };
  };
};
