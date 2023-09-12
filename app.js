const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define your POST route
app.post("/", (req, res) => {
  try {
    // Check if the "str" field exists in the request body
    if (!req.body || !req.body.str) {
      return res.status(400).json({ error: 'Payload is missing "str" field' });
    }

    // Extract the string from the request body
    const inputString = req.body.str;

    // Use a regular expression to split the string into words
    const words = inputString.split(/\s+/).filter((word) => word !== "");

    // Check if there are at least 8 words
    if (words.length >= 8) {
      return res.status(200).json({ message: "200 OK" });
    } else {
      return res
        .status(406)
        .json({ error: "Not Acceptable: Less than 8 words" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
