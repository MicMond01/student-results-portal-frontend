import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface IBanner {
  title: string | ReactNode;
  desc: string;
  actionButton?: ReactNode;
  titleClass?: string;
  descClass?: string;
  containterClass?: string;
}
const Banner = (props: IBanner) => {
  const { title, desc, actionButton, containterClass, titleClass, descClass } =
    props;
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-8 my-4 rounded-md shadow-sm bg-[#e5d9f2]",
        containterClass
      )}
    >
      <div>
        {typeof title === "string" ? (
          <h1 className={cn("font-bold text-2xl", titleClass)}>{title}</h1>
        ) : (
          title
        )}
        <span className={cn("text-gray-500 text-sm", descClass)}>{desc}</span>
      </div>
      <div>{actionButton}</div>
    </div>
  );
};

export default Banner;
