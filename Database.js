const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});

class Database {
  constructor() {
    this.base = Airtable.base(process.env.BASE_ID);
    this.data = [];
    this.nextPage = null;
    this.pageSize = 5;
  }
  getModels(req, res) {
    try {
      return new Promise((resolve) => {
        this.base('models').select({
          pageSize: this.pageSize,
          view: "Grid view"
        }).eachPage((records, fetchNextPage) => {

          records.forEach((record) => {
            let number = record.get("number");
            let children = record.get("children");
            if (!children) {
              children = [];
            }

            this.data.push({
              number,
              children,
            });

          });

          this.nextPage = fetchNextPage;
          resolve();
        }, function done(err) {
          if (err) { console.error(err); return; }
        });
      });
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" })
    }
  }
}

module.exports = new Database();