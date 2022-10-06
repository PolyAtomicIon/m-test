const database = require('../Database');

class Hierarchy {
  async getModels(req, res) {
    try {
      if( !database.rootNode )
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
      const data = await database.getDrawings();

      res.render(
        "drawings",
        {
          data,
          drawingModelsList: (id) => {
            console.log(id)
          }
        }
      );
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }
  async getDrawingByNumber(req, res) {
    try {
      await database.getDrawingByNumber(req.params.number);

      res.render(
        "drawingModels",
        {
          data: database.drawingModels,
        }
      );
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }
  
}

module.exports = new Hierarchy()