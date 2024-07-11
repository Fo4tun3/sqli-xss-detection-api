const env = require("dotenv").config();
const express = require('express');
const app = express();

const morgan = require("morgan");
app.use(morgan("tiny"));

const cors = require("cors");

// const pagesRoutes = require("./routes/pages/pages");
const registrationsRoutes = require("./routes/auth/register");
const loginRoutes = require("./routes/auth/login");
// const subscription_emailsRoutes = require("./routes/subscription_emails/subscription");
// const imgUpload = require("./routes/imgUploads/imgUpload");
// const adminsRoutes = require("./routes/admin/admin");
// const entreprenuersRoutes = require("./routes/entreprenuers/entreprenuers");
// const learnersRoutes = require("./routes/learners/learners");
// const skillsRoutes = require("./routes/skills/skill");
// const productsRoutes = require("./routes/products/products");
// const cartRoutes = require("./routes/cart/cart");
// const chatRoutes = require("./routes/chat/chat");

// const adminsRoutes = require("./chart");

app.use(express.json());

// app.use("/api/v1", cors(), pagesRoutes);
app.use("/api/v1/auth", cors(), registrationsRoutes);
app.use("/api/v1/auth", cors(), loginRoutes);
// app.use("/api/v1/subscribed-emails", cors(), subscription_emailsRoutes);
// app.use("/api/v1/uploadimg", cors(), imgUpload);
// app.use("/api/v1/admin", cors(), adminsRoutes);
// app.use("/api/v1/entreprenuers", cors(), entreprenuersRoutes);
// app.use("/api/v1/learners", cors(), learnersRoutes);
// app.use("/api/v1/skills", cors(), skillsRoutes);
// app.use("/api/v1/products", cors(), productsRoutes);
// app.use("/api/v1/cart", cors(), cartRoutes);
// app.use("/api/v1/chat", cors(), chatRoutes);


app.use(cors());

app.use(express.static('frontend'));

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
    res.send("Started running");
})

app.use((req, res, next) =>  {
    let err = new Error("Not Found" );
    err.status = 404;
    // console.log(err);
    return next(err);
});

if (app.get("env") === "development" ) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        return res.json({
            message: err.message,
            error: err
        });
    });
}

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
