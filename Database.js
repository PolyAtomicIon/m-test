const Model = require('./models/Model');
const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});

class Database {
  constructor() {
    this.base = Airtable.base(process.env.BASE_ID);
    this.pageSize = 100;
    this.maxRecords = 300;

    this.drawingModels = [];

    this.models = {};
    this.rootNode = null;
  }

  async getModels() {
    let records = await this.base("models").select({
      fields: ["number"]
    }).all();

    records.forEach(r => {
      const id = r.id;
      const number = r.get("number");
      if (!this.models[id])
        this.models[id] = new Model(number);
    })
  }

  async getTree() {
    console.log('request')
    await this.getModels();

    await new Promise((resolve, reject) => {
      this.base('model_model').select({
        pageSize: this.pageSize,
        maxRecords: this.maxRecords,
        fields: ["parent_number", "number"],
        view: "Grid view",
      }).eachPage(async (records, fetchNextPage) => {

        records.forEach((record) => {
          let child = record.get("number");
          let parent = record.get("parent_number");

          this.models[parent].addChildNode(this.models[child]);
          this.models[child].setParent(this.models[parent]);
        })

        fetchNextPage();
      }, function done(err) {
        if (err) {
          console.error(err);
          reject();
          return;
        }
        resolve();
      });
    });

    this.rootNode = Object.values(this.models).find(m => {
      return m.isNodeRoot()
    });

    return this.rootNode;
  }

  async getModelById(id) {
    let res = null;

    await new Promise(resolve => {
      this.base('models').find(id, function (err, record) {
        if (err) { console.error(err); return; }
        res = record.get("number");
        resolve();
      });
    });

    return res;
  }

  async getDrawings() {
    const records = await this.base('drawings').select({
      view: "Grid view",
    }).all();

    const data = [];
    records.forEach(r => {
      const id = r.id;
      const name = r.get('name');
      const models = r.get('model_model');
      data.push({
        id,
        name,
        models
      })
    })

    return data;
  }

  getDrawingByNumber(number) {
    return new Promise((resolve, reject) => {
      this.base('drawings').find(number,
        (err, record) => {
          if (err) { console.error(err); reject(); return; }
          console.log(record);
          this.drawingModels = record;
          resolve();
        });
    });
  }

}

module.exports = new Database();