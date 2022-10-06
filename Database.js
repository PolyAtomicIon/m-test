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

    this.parentChild = {};
    this.models = {};
    this.isModelsFetched = false;

    this.drawings = null;
    this.services = null;
    this.rootNode = null;
  }

  async getModels() {
    if (this.isModelsFetched)
      return

    let records = await this.base("models").select({
      fields: ["number"]
    }).all();

    records.forEach(r => {
      const id = r.id;
      const number = r.get("number");
      if (!this.models[id])
        this.models[id] = new Model(number);
    });

    this.isModelsFetched = true;
  }

  async getTree() {
    if (this.rootNode)
      return

    console.log('request');

    await this.getModels();

    const records = await this.base('model_model').select({
      pageSize: this.pageSize,
      maxRecords: this.maxRecords,
      fields: ["id", "parent_number", "number"],
      view: "Grid view",
    }).all();

    records.forEach((record) => {
      const childId = record.get("number");
      const parentId = record.get("parent_number");

      const child = this.models[childId];
      const parent = this.models[parentId];

      this.parentChild[record.id] = {
        child: child.number,
        parent: parent.number,
      };
      parent.addChildNode(child);
      child.setParent(parent);
    });

    this.rootNode = Object.values(this.models).find(m => {
      return m.isNodeRoot()
    });

    return this.rootNode;
  }

  async getDrawings() {
    if (this.drawings)
      return;

    const records = await this.base('drawings').select({
      view: "Grid view",
      fields: ['name']
    }).all();

    this.drawings = records.map(r => {
      const id = r.id;
      const name = r.get('name');

      return {
        id,
        name,
      };
    })
  }

  async getDrawingModelsById(drawingId) {
    let data = [];

    await this.getTree();

    await new Promise((resolve, reject) => {
      this.base('drawings').find(drawingId,
        (err, record) => {
          if (err) { console.error(err); reject(); return; }

          const models = record.get("model_model");
          data = models.map(id => {
            return this.parentChild[id]
          });

          resolve();
        });
    });

    return data;
  }

  async getServices() {
    if (this.services)
      return;

    const records = await this.base('services').select({
      view: "Grid view",
      fields: ['name', 'calendar_interval', 'calendar_interval_unit', 'running_hours_interval']
    }).all();

    this.services = records.map(r => {
      const name = r.get('name');
      const hoursInterval = r.get('running_hours_interval');
      const interval = r.get('calendar_interval');
      const intervalUnit = r.get('calendar_interval_unit');

      return {
        name,
        hoursInterval,
        interval,
        intervalUnit,
      };
    })
  }

}

module.exports = new Database();