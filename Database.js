const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});

class Database {
  constructor() {
    this.base = Airtable.base(process.env.BASE_ID);
  }
  async getModels(req, res) {
    try {

      const records = await this.base('models').select(
        {
          view: "Grid view",
          maxRecords: 15,
        }
      ).all();

      const data = [];
      records.forEach((record) => {
        let number = record.get("number");
        let children = record.get("children");
        data.push({
          number,
          children
        });
      });

      return data;
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }
}

module.exports = new Database();