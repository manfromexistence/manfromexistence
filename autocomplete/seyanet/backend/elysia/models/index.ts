import mongoose from 'mongoose';
const { Schema } = mongoose;

interface MyDocument {
  name: string;
  age: number;
  // Add other properties as needed
}

const MySchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  // Add validation and other schema options here
});

const MyModel = mongoose.model<MyDocument>('MyCollection', MySchema);

async function createDocument() {
  const newDocument = new MyModel({ name: 'John Doe', age: 30 });
  await newDocument.save();
  console.log('Document created successfully!');
}

createDocument();

// const blogSchema = new Schema({
//   title: String, // String is shorthand for {type: String}
//   author: String,
//   body: String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs: Number
//   }
// });

// const schema = new Schema({
//   _id: Number // <-- overwrite Mongoose's default `_id`
// });
// const Model = mongoose.model('Test', schema);
// const doc = new Model();

// async function saveToMongoDB() {
//   doc._id = 1;
//   await doc.save(); // works
// }

// saveToMongoDB();

// const schema = new Schema({ name: String });
// schema.path('name') instanceof mongoose.SchemaType; // true
// schema.path('name') instanceof mongoose.Schema.Types.String; // true
// schema.path('name').instance; // 'String'\

// const schema = new mongoose.schema({
//   name: String,
//   binary: Buffer,
//   living: Boolean,
//   updated: { type: Date, default: Date.now },
//   age: { type: Number, min: 18, max: 65 },
//   mixed: Schema.Types.Mixed,
//   _someId: Schema.Types.ObjectId,
//   decimal: Schema.Types.Decimal128,
//   array: [],
//   ofString: [String],
//   ofNumber: [Number],
//   ofDates: [Date],
//   ofBuffer: [Buffer],
//   ofBoolean: [Boolean],
//   ofMixed: [Schema.Types.Mixed],
//   ofObjectId: [Schema.Types.ObjectId],
//   ofArrays: [[]],
//   ofArrayOfNumbers: [[Number]],
//   nested: {
//     stuff: { type: String, lowercase: true, trim: true }
//   },
//   map: Map,
//   mapOfString: {
//     type: Map,
//     of: String
//   }
// });

// const Thing = mongoose.model('Thing', schema);

// const m = new Thing;
// m.name = 'Statue of Liberty';
// m.age = 125;
// m.updated = new Date;
// m.binary = Buffer.alloc(0);
// m.living = false;
// m.mixed = { any: { thing: 'i want' } };
// m.markModified('mixed');
// m._someId = new mongoose.Types.ObjectId;
// m.array.push(1);
// m.ofString.push('strings!');
// m.ofNumber.unshift(1, 2, 3, 4);
// m.ofDates.addToSet(new Date);
// m.ofBuffer.pop();
// m.ofMixed = [1, [], 'three', { four: 5 }];
// m.nested.stuff = 'good';
// m.map = new Map([['key', 'value']]);
// m.save(callback);

const productSchema:any = new mongoose.Schema({
  title: {type: "string",require:true,trim:true},
  description: {type: "string",require:true,trim:true},
  variation: {type: "string",require:true,trim:true},
  price_include: {type: "string",require:true,trim:true},
  contents_and_exclusions: {type: "string",require:true,trim:true},
  interests: {type: "string",require:true,trim:true},
  transportation: {type: "string",require:true,trim:true},
  guidance_and_assistance: {type: "string",require:true,trim:true},
  path: {type: "string",require:true,trim:true},
  requirements: {type: "string",require:true,trim:true},
})

// const productModel = mongoose.model("product", productSchema);

// const product_one = new productModel({
//   title: "product_one",
//   description: "product_one",
//   // variation: "product_one",
//   // price_include: "product_one",
//   // contents_and_exclusions: "product_one",
//   // interests: "product_one",
//   // transportation: "product_one",
//   // guidance_and_assistance: "product_one",
//   // path: "product_one",
//   // requirements: "product_one",

// });
// await product_one.save();

// export default productModel;
