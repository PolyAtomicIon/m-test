const database = require('./Database');

class Controller {
  async getModels(req, res) {
    try {
      await database.getTree();

      res.render(
        "hierarchy",
        {
          node: database.rootNode,
        }
      );
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }

  async getDrawings(req, res) {
    try {
      await database.getDrawings();

      res.render(
        "drawings",
        {
          data: database.drawings,
        }
      );
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }

  async getDrawingById(req, res) {
    try {
      const id = req.params.id;
      const models = await database.getDrawingModelsById(id);

      res.render(
        "drawingModels",
        {
          models,
        }
      );
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }

  async getServices(req, res) {
    try {
      await database.getServices();

      res.render(
        "services",
        {
          data: database.services,
        }
      );
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }

}

module.exports = new Controller()