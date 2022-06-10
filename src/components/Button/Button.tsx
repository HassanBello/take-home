import type { FC } from "react";

const CustomBtn: FC<{ click: Function }> = ({ click, children }) => {
  return (
    <div className="text-base bg-gray-400 rounded-lg max-w-[130px] px-4 py-3 w-full cursor-pointer" onClick={() => click()}>
        {children}
    </div>
  );
};

export default CustomBtn;
