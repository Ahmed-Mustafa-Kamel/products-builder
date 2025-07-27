interface IProps {
    message: string
}
const Error = ({message}: IProps) => {
    return message ? <span className="block text-red-500 ">{message}</span>: null
};

export default Error ;
