export const myLooger = (req, res, next) => {
  console.log("Logged")
  next();
}