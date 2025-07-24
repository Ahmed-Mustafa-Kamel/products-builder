import { InputHTMLAttributes } from "react";
const Input = ({...rest}: InputHTMLAttributes<HTMLInputElement>) => {
    return <input {...rest} className='border-2 border-gray-300 p-1 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 ease-in-out' />

};

export default Input ;
