const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (pass) {
        
            return pass?.length && pass.length >= 5;
           
          },
          message:"password must be at least 5 characters",

        },
      },
    },


  { timestamps: true }
);

// UserSchema.post("validate", function (user) {
//   user.password = "hashed";
// });
export const User = models?.User || model("User", UserSchema);

