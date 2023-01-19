const emailView = (req, res, next) => {
  res.render("email");
};

// const sendEmail = (req, res, next) => {
//     try {
//       const{emailObj}

//   } catch (error) {
//     console.log(400);
//     res.status(400).json(error);
//   }
// };

module.exports = {
  emailView,
  sendEmail,
};
