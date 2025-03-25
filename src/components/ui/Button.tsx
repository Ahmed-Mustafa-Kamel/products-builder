import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: React.ReactNode;
  width?: string;
}
const Button = ({ className, children, width, ...rest }: IProps) => {
  return (
    <button
      className={`${className} ${width} text-white font-bold py-2 px-4 rounded-md cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
