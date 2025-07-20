interface IProps {
    imageURL: string,
    alt: string,
    className: string
}

function Image({imageURL , alt ,className}: IProps) {
  return (
      <img src={imageURL} alt={alt} className={className} />  )
}

export default Image