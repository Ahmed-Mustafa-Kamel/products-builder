// productObj === errorObj (TITLE ,DESCRIPTION ,IMAGE , PRICE )




export const productValidation =(product : {title: string, description: string, imageURL: string, price: string})=>{
    // Returns an object
    const errors : {title: string, description: string, imageURL: string, price: string}  ={
        title: "", description: "", imageURL: "", price: "" }

        const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL)

        if(!product.title.trim() || product.title.length < 10 || product.title.length > 80){
            errors.title = "Title must be between 10 and 80 characters"
        }

        if(!product.description.trim() || product.description.length < 20 || product.description.length > 200){
            errors.description = "Description must be between 20 and 200 characters"
        }

        if(!product.imageURL.trim() || !validUrl){
            errors.imageURL = "Valid Image URL is required"
        }

        if(!product.price.trim() || isNaN(Number(product.price))){
            errors.price = "Price must be a number"
        }
    return errors
}