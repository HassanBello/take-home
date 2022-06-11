const express = require("express");
const { checkSchema, validationResult } = require("express-validator");
const path = require("path");
const { Agent } = require("./model");
const { agentSchema } = require("./schema/agentSchema");
const bodyParser = require("body-parser");
const { Op } = require("sequelize");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"), { root: "./" });
});

app.get("/agents", async (req, res, next) => {
  const agents = await Agent.findAll();
  return res.status(200).json(agents);
});

app.get("/agent/area/search", async (req, res, next) => {
  const agent = await Agent.findAll({
    where: {
      practiceAreas: {
        [Op.like]: `%${req.query.practiceAreas}%`,
      },
    },
  });
  if (agent === null || agent === []) {
    return res.status(404).json({
      message: "No Agent found",
    });
  } else {
    return res.status(200).json(agent);
  }
});

app.get("/agent/:id", async (req, res, next) => {
  const agent = await Agent.findOne({
    where: { id: req.params.id },
  });
  if (agent === null) {
    return res.status(404).json({
      message: "No Agent found",
    });
  } else {
    return res.status(200).json(agent);
  }
});

app.post("/agent/review", async (req, res, next) => {
  const agent = await Agent.findOne({
    where: { id: req.body.id },
  });
  if (agent === null) {
    return res.status(404).json({
      message: "No Agent found",
    });
  } else {
    let oldReviews = JSON.parse(agent.reviews);
    if (oldReviews) {
      await Agent.update(
        {
          reviews: JSON.stringify([...oldReviews, req.body.review]),
        },
        { where: { id: req.body.id } }
      );
      return res.status(200).json({ status: "success" });
    } else {
      await Agent.update(
        {
          reviews: JSON.stringify([req.body.review]),
        },
        { where: { id: req.body.id } }
      );
      return res.status(200).json({ status: "success" });
    }
  }
});

app.post("/agent", checkSchema(agentSchema), async (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    let payload = errors.map((item) => ({
      error: item.msg,
    }));
    return res.status(400).json({
      status: "error",
      errors: payload,
    });
  } else {
    const {
      firstName,
      lastName,
      photoUrl,
      agentLicense,
      address,
      practiceAreas,
      aboutMe,
    } = req.body;

    const agent = await Agent.create({
      firstName,
      lastName,
      photoUrl,
      agentLicense,
      address,
      practiceAreas,
      aboutMe,
    });
    return res.status(201).json({
      status: "success",
      data: agent.dataValues,
    });
  }
});

module.exports = app;
