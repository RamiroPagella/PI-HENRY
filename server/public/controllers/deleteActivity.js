"use strict";

require("core-js/modules/es.promise.js");
const {
  Activity
} = require('../db');
async function deleteActivity(req, res) {
  try {
    const {
      name
    } = req.query;
    if (!name) return res.status(400);
    const deletedActivity = await Activity.destroy({
      where: {
        name: name
      }
    });
    if (deletedActivity === 1) res.status(200).json({
      deleted: true
    });else res.status(400).json({
      deleted: false
    });
  } catch (error) {
    console.log("Error al eliminar la actividad", error.message);
    res.status(500).json({
      error: error.message
    });
  }
}
module.exports = deleteActivity;