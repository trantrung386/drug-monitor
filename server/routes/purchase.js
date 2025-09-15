const express = require("express");
const router = express.Router();
const Drug = require("../model/model"); // nếu model thuốc của bạn tên khác thì sửa lại

// API JSON để tính toán khi nhập số ngày
router.get("/api", async (req, res) => {
  try {
    let days = parseInt(req.query.days) || 30;
    const drugs = await Drug.find();

    const result = drugs.map(d => {
      const pills = days * d.perDay;
      return {
        name: d.name,
        cards: Math.ceil(pills / d.card),
        cardPerPack: (d.pack / d.card).toFixed(2),
        packs: Math.ceil(pills / d.pack),
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// View mặc định (render EJS)
router.get("/", async (req, res) => {
  try {
    let days = parseInt(req.query.days) || 30;
    const drugs = await Drug.find();
    res.render("purchase", { drugs, days });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
