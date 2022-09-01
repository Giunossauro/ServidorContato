import http from "http";
import express from "express";
import routes from "./apps/api/routes";
import path from "path";
import cors from "cors";
import connection from "./database/connection";

const router = express();

router.use(express.urlencoded({ extended: false }));
router.use(cors());
router.use(express.json());
router.set("db", connection);

router.use(express.urlencoded({ extended: false }));
router.use(express.static(path.join(__dirname, "public")));

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }

  next();
});

router.use("/", routes);

router.use((_req, res, _next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

export default http.createServer(router);
