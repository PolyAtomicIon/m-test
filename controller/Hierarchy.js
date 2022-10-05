const database = require('../Database');

class Hierarchy {
  async getModels(req, res) {
    try {
      const records = await database.getModels();
      res.render("hierarchy",
        {
          title: "Home",
          data: records
        });
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }
}

module.exports = new Hierarchy()