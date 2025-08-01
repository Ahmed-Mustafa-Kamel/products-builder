interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
color: string,


}
const ColorCircle = ({color , ...props}: IProps) => {
    return (
        <span className={`w-5 h-5 rounded-full cursor-pointer`} style={ {backgroundColor: color} } {...props}></span>

    );
};

export default ColorCircle ;
