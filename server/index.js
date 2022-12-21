const express = require("express");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const URL = process.env.MONGO_DB_URI;
const PORT = 4000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const client = new MongoClient(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const connect = async () => {
  await client.connect();
};

const _db = client.db("aptDeco");
const Categories = _db.collection("categories");
const Products = _db.collection("products");
const Users = _db.collection("users");
const Bookings = _db.collection("bookings");
const Payments = _db.collection("payments");
const Wishlists = _db.collection("wishlist");
const ReportLists = _db.collection("reportlist");

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "unauthorized access" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).json({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function verifyAdmin(req, res, next) {
  const decodedEmail = req.decoded.email;
  const query = { email: decodedEmail };
  const user = await Users.findOne(query);
  if (user?.role === "user" && user?.role === "seller") {
    return res
      .status(403)
      .json({ status: false, message: "Unauthorize Access" });
  }
  next();
}

async function verifySeller(req, res, next) {
  const decodedEmail = req.decoded.email;
  const query = { email: decodedEmail };
  const user = await Users.findOne(query);
  if (user?.role === "user") {
    return res
      .status(403)
      .json({ status: false, message: "Unauthorize Access" });
  }
  next();
}

app.get("/", (req, res) => {
  console.log(`request received at ${new Date()}`);
  console.dir(req.ip);
  //console.dir(res);
  res.send(`request received at ${new Date()} `);
});
////////////////////////////////////////////////////
//Products category
app.get("/categories", async (req, res) => {
  try {
    const categories = await Categories.find().toArray();
    res.status(200).json({ status: true, data: categories });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/categories/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const ProductsByCategory = await Products.find({
      category: name,
    }).toArray();

    return res.status(200).json({ status: true, data: ProductsByCategory });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

//////////////////////////////////////////////////
///Products
app.get("/all-products", async (req, res) => {
  try {
    const allProducts = await Products.find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({ status: true, data: allProducts });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/all-products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findOne({ _id: ObjectId(id) });

    return res.status(200).json({ status: true, data: product });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.delete("/all-products/:id", verifyJWT, verifySeller, async (req, res) => {
  try {
    const id = req.params.id;
    await Products.deleteOne({ _id: ObjectId(id) });

    return res
      .status(200)
      .json({ status: true, message: "Item Deleted successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.put("/all-products/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;
    await Products.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          advertise: "true",
        },
      }
    );

    return res
      .status(200)
      .json({ status: true, message: "Product advertised successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.post("/products", verifyJWT, verifySeller, async (req, res) => {
  try {
    const newData = req.body;
    await Products.insertOne(newData);
    res
      .status(201)
      .json({ status: true, message: "Products added successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});
////////////////////////////////////
//jwt  token

app.post("/jwt", async (req, res) => {
  try {
    const user = req.body;
    const token = await jwt.sign(user, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "10d",
    });
    res.status(200).json({ status: true, token });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});
/////////////////////////////////
//wishList

app.post("/wishlist", async (req, res) => {
  try {
    const newData = req.body;
    const query = {
      itemId: newData?.itemId,
    };

    const alreadyWishlistItem = await Wishlists.findOne(query);

    if (alreadyWishlistItem === true) {
      return res
        .status(400)
        .json({ status: false, message: "Already booked this item" });
    } else {
      await Wishlists.insertOne(newData);

      res
        .status(200)
        .json({ status: true, message: "Added Product on Wishlist" });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/wishlist/:email", verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;

    const wishlistByEmail = await Wishlists.find({ userEmail: email })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json({ status: true, data: wishlistByEmail });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.delete("/wishlist/:id", verifyJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    await Wishlists.deleteOne(filter);
    res.status(200).json({ status: true, message: "Item Delete Successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});
/////////////////////
//Reported Products
app.post("/reportlist", verifyJWT, async (req, res) => {
  try {
    const newData = req.body;
    const query = {
      itemId: newData?.itemId,
    };

    const alreadyWishlistItem = await ReportLists.findOne(query);

    if (alreadyWishlistItem === true) {
      return res
        .status(400)
        .json({ status: false, message: "Already Reported this item" });
    } else {
      await ReportLists.insertOne(newData);

      res.status(200).json({ status: true, message: "Report to the Admin" });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/reportlist", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const allReportList = await ReportLists.find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json({ status: true, data: allReportList });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.delete("/reportlist/:id", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    await ReportLists.deleteOne(filter);
    res.status(200).json({ status: true, message: "Item Delete Successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});
/////////////////

//user related functions
app.post("/users/:email", verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;
    const user = req.body;

    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: user,
    };
    const result = await Users.updateOne(filter, updateDoc, options);

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/users/:email", verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;

    const filter = { email: email };

    const result = await Users.findOne(filter);

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const users = await Users.find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.delete("/users/:id", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    await Users.deleteOne(filter);
    res.status(200).json({ status: true, message: "User Delete Successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.put("/users/:id", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;

    const updateDoc = {
      $set: {
        isVerified: true,
      },
    };
    await Users.updateOne({ _id: ObjectId(id) }, updateDoc);

    res.status(200).json({ status: true, data: "Verified the seller" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

/////////////////////////////////////////////////
//booking product data

app.post("/bookings", verifyJWT, async (req, res) => {
  try {
    const newData = req.body;
    await Bookings.insertOne(newData);
    res
      .status(201)
      .json({ status: true, message: "Booking Product successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/bookings", verifyJWT, async (req, res) => {
  try {
    const allBookings = await Bookings.find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json({ status: true, data: allBookings });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});
app.delete("/bookings/:id", verifyJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    await Bookings.deleteOne(query);

    res
      .status(200)
      .json({ status: true, message: "Item Deleted successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/bookings/:email", verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;

    const bookingByEmail = await Bookings.find({ userEmail: email })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json({ status: true, data: bookingByEmail });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/all-bookings/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const booking = await Bookings.findOne({ _id: ObjectId(id) });

    return res.status(200).json({ status: true, data: booking });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

//////////////////////////////
//payment stripe setup

app.post("/create-payment-intent", verifyJWT, async (req, res) => {
  const price = req.body.price;

  const amount = parseFloat(price) * 100;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      payment_method_types: ["card"],
      description: "Payment for item",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});
////////////////////////////////////////////////////////////////
//Save Payment on Database
app.post("/payments", verifyJWT, async (req, res) => {
  const payment = req.body;

  const result = await Payments.insertOne(payment);
  const id = payment.bookingId;
  const itemId = payment.itemId;

  const filter = { _id: ObjectId(id) };
  const updatedDoc = {
    $set: {
      paid: true,
      transactionId: payment.transactionId,
    },
  };
  await Bookings.updateOne(filter, updatedDoc);
  await Products.updateOne(
    { _id: ObjectId(itemId) },
    {
      $set: {
        advertise: "null",
        status: "paid",
        transactionId: payment.transactionId,
      },
    }
  );
  res.send(result);
});

//////////////////////////////////////////////////////////////
app.use("/*", async (req, res) => {
  res.status(400).json({ message: "The Route doesn't exist" });
});

app.listen(PORT, async () => {
  await connect();

  console.log("database connection established");
  console.log(`Server is running on port : ${PORT}`);
});
