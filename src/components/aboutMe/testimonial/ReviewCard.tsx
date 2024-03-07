import { Comment } from "@/utils/Types";
import { Rate, Typography } from "antd";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ fullName, email, occupation, description }: Comment) => {
  return (
    <div>
      <div className="relative bg-glass p-4">
        <h1 className="text-xl font-bold">{fullName}</h1>
        <h1 className="Text">{email}</h1>
        <FaQuoteRight className="text-3xl top-2 right-3 absolute " />
        <Typography.Paragraph
          className="text-base text-white py-2"
          ellipsis={{
            rows: 4,
            expandable: true,
            symbol: "Read More",
          }}
        >
          {description}
        </Typography.Paragraph>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold truncate capitalize">
            {occupation}
          </h1>
          <Rate defaultValue={5} allowHalf className="text-sm" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
