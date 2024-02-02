// Import mongoose module
const mongoose = require("mongoose");

// Define the schema structure for user details
const UserDetailsSchema = new mongoose.Schema(
    {
        fname: String, // First name of the user
        lname: String, // Last name of the user
        email: { type: String, unique: true }, // Email of the user, unique constraint applied
        password: String // Password of the user
    },
    {
        collection: "UserInfo", // Specify the collection name in the database
    }
);

// Create a model based on the schema and associate it with the "UserInfo" collection
mongoose.model("UserInfo", UserDetailsSchema);
