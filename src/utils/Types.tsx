

export type ButtonProps = {
    url: string,
    text: string
}

export type HeadProps = {
    title: string,
    text: string
}

export type SkillProps = {
    icon: string,
    index: number
}

export type ServiceProps = {
    id: string,
    title: string,
    gif: string,
    desc: string
}

export type PriceProps = {
    title: string,
    amount: number,
    service: { plan: string }[];
}

export type ProjectProps = {
    link: string,
    code: string,
    imgUrl: string
    projectName: string,
    connect: string,
    desc: string,
    tools: {tool: string}[]
}

export type CardProps = {
    id: number,
    imgUrl: string
    projectName: string,
    link: string,
}

export type Comment = {
    _id?: string
    fullName: string;
    email: string
    occupation:string
    description: string;
  }
  