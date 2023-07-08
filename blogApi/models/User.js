/** @format */

var bcrypt = require(`bcrypt`);
var jwt = require(`jsonwebtoken`);
var mongoose = require(`mongoose`);
var validator = require(`validator`);
var secreteKey = process.env.KEY;
var Schema = mongoose.Schema;
var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("not valid email address");
        }
      },
    },
    password: { type: String, required: true },
    BlogId: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true }
);

// hash password

userSchema.pre("save", async function (next) {
  try {
    if (this.password && this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

// verify password

userSchema.methods.verifyPassword = async function (password) {
  try {
    let result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};

// generate token

userSchema.methods.generateAuthToken = async function () {
  let payload = {
    userId: this.id,
    name: this.name,
    email: this.email,
  };
  try {
    let token = await jwt.sign(payload, secreteKey);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    return error;
  }
};

// show json user

userSchema.methods.userJSON = function (token) {
  return {
    name: this.name,
    email: this.email,
    token: token,
  };
};
module.exports = mongoose.model("User", userSchema);
