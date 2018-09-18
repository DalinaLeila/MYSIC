module.exports = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/project-three",
  SECRET_JWT_PASSPHRASE: "TWLom9RDbmGYBtkHHPe4m8pKswyUY",
  CLOUDINARY_NAME: "dalina-leila",
  CLOUDINARY_KEY: "171611935637156",
  CLOUDINARY_SECRET: "6sr0VnlFenJnRl23TXidFblkOqs"
};
