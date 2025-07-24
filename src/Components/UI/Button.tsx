import { ReactNode, ComponentProps } from "react"

interface IProps {
    children: ReactNode,
    className?: string,
}

const Button = ({ children, className, ...rest }: IProps & ComponentProps<"button">) => {
    return (
        <button className={`${className} text-white font-bold py-2 px-4 rounded-lg flex-1 cursor-pointer`} {...rest}>{children}
        </button>
    )
}

export default Button