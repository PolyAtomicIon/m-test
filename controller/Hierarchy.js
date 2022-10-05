const database = require('../Database');

class Hierarchy {
  async getModels(req, res) {
    try {
      if( !database.nextPage )
        await database.getModels();

      res.render(
        "hierarchy",
        {
          data: database.data,
          next: database.nextPage
        });
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }
}

module.exports = new Hierarchy()