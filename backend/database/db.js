import mongoose from "mongoose";

const Connection = async(username, password) => {
    try{
        const url = `mongodb+srv://${username}:${password}@blog-app.d43xgoa.mongodb.net/testSchema?retryWrites=true&w=majority`
        await mongoose.connect(url, {useNewUrlParser:true});
        console.log('Database connection Successfull.');
    }catch(e){
        console.error("Error in database connection : ", e);
    }
}

export default Connection;