// const database = require('./Database');

class Controller {
  // menu(req, res) {
  //   try {
  //     res.render(
  //       "menu",
  //     );
  //   } catch (error) {
  //     console.log(error)
  //     res.status(400).json({ message: "Registration error" })
  //   }
  // }
  // async getTree(req, res) {
  //   try {
  //     // await database.getTree();
  //     res.render(
  //       "hierarchy",
  //       {
  //         node: database.rootNode,
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error)
  //     res.status(400).json({ message: "Registration error" })
  //   }
  // }
  // async getDrawings(req, res) {
  //   try {
  //     // await database.getDrawings();
  //     res.render(
  //       "drawings",
  //       {
  //         data: database.drawings,
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error)
  //     res.status(400).json({ message: "Registration error" })
  //   }
  // }
  // async getDrawingById(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const models = await database.getDrawingModelsById(id);
  //     res.render(
  //       "drawingModels",
  //       {
  //         models,
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error)
  //     res.status(400).json({ message: "Registration error" })
  //   }
  // }
  // async getServices(req, res) {
  //   try {
  //     await database.getServices();
  //     const data = database.services.map(service => {
  //       let date = new Date();
  //       switch (service.intervalUnit) {
  //         case 'day':
  //           date = new Date(date.setDate(date.getDate() + service.interval));
  //           break;
  //         case 'week':
  //           date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 * service.interval);
  //           break;
  //         case 'month':
  //           date = new Date(date.setMonth(date.getMonth() + service.interval));;
  //           break;
  //         case 'year':
  //           date = new Date(date.setFullYear(date.getFullYear() + service.interval));
  //           break;
  //         default:
  //           date = new Date(date.setHours(date.getHours() + service.hoursInterval));
  //       }
  //       return {
  //         name: service.name,
  //         // date: date.toDateString(),
  //         date,
  //       }
  //     });
  //     res.render(
  //       "services",
  //       {
  //         data,
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error)
  //     res.status(400).json({ message: "Registration error" })
  //   }
  // }
}

module.exports = new Controller();
