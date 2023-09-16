import mongoose from "mongoose";
let database: mongoose.Connection;

export const connect = async () => {
    if (database) {
        return;
    }
    const CONNECTION_URI: string = process.env.DB_HOST as string;
    const options: Object = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //  autoIndex: true, //Modified later for achieving universal search.
        connectTimeoutMS: 5000,
        socketTimeoutMS: 5000,
    };

    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(CONNECTION_URI, options)
            .then(() => {

                console.log("\nConnected to database");
            }).catch((error: any) => {
                console.log("\nDB Error :::", error);
            })
    } catch (error: any) {
        console.log("\nDB Error1 :::", error);
    }
    database = mongoose.connection;
};
export const disconnect = () => {
    if (!database) {
        return;
    }
    mongoose.disconnect();
    console.log("\nDisconnected to database");
};

