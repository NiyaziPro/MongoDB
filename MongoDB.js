use("products");
db.electronics.find();

use("shop");
db.electronics.insertMany([
  { name: "Laptop", price: 1000 },
  { name: "Smartphone", price: 500 },
  { name: "Headphones", price: 150 },
  { name: "Smartwatch", price: 200 },
  { name: "Camera", price: 800 },
  { name: "Keyboard", price: 300 },
  { name: "Mouse", price: 80 },
  { name: "Monitor", price: 40 },
  { name: "Printer", price: 1000 },
]);

use("shop");
db.electronics.insertMany([
  { name: "Smart Tv", price: 1200, tax: 100 },
  { name: "Bluetooth Speaker", price: 75, tax: 7.5 },
  { name: "External Hard Drive", price: 150, tax: 15 },
  { name: "Home Theater System", price: 450, tax: 45 },
  { name: "Digital Camera Lens", price: 250, tax: 25 },
]);
use("shop");
db.electronics.find();

//=============================================
//    findOneAndUpdate - findOneAndReplace
//=============================================
/*
1. Sorgu Operatörleri (Query Operators)
Sorgu operatörleri, veriyi filtrelemek ve kriterlere uygun belgeleri döndürmek için kullanılır.

Operatör	Açıklama	Örnek
$eq	Eşittir (equals).	{ age: { $eq: 25 } } - age alanı 25 olan belgeleri getirir.

$ne	Eşit değildir (not equal).	{ age: { $ne: 25 } } - age 25 olmayan belgeleri getirir.

$gt	Büyüktür (greater than).	{ age: { $gt: 20 } } - age 20'den büyük belgeleri getirir.

$lt	Küçüktür (less than).	{ age: { $lt: 20 } } - age 20'den küçük belgeleri getirir.

$gte	Büyük veya eşittir (greater than or equal).	{ age: { $gte: 20 } }

$lte	Küçük veya eşittir (less than or equal).	{ age: { $lte: 20 } }

$in	Liste içinde bir değere sahiptir.	{ age: { $in: [20, 25, 30] } }

$nin	Liste içindeki değerlerden biri değildir.	{ age: { $nin: [20, 25, 30] } }

*/

use("shop");
db.electronics.findOneAndReplace(
  { price: { $lt: 100 } },
  { name: "mobilPhone", price: 250 }
);

use("shop");
db.electronics.find();

use("shop");
db.electronics.findOneAndUpdate(
  { price: { $lt: 100 } },
  { $set: { price: 99 } },
  { sort: { price: -1 } }
);

use("shop");
db.electronics.find();

use("shop");
db.electronics.findOneAndReplace(
  { price: { $lt: 100 } },
  { name: "En Pahali" },
  { sort: { price: -1 } }
);

use("shop");
db.electronics.find();

use("shop");
db.electronics.findOneAndUpdate(
  { price: { $gt: 100 } },
  { $set: { name: "En Ucuz" } },
  { sort: { price: 1 } }
);

/*
Güncelleme Operatörleri (Update Operators)
Güncelleme işlemlerinde belge içindeki değerleri değiştirmek için kullanılır.

Operatör	Açıklama	Örnek
$set	Alanın değerini ayarlar.	{ $set: { name: "Ali" } }

$unset	Alanı kaldırır.	{ $unset: { age: "" } }

$inc	Sayısal bir değeri artırır/azaltır.	{ $inc: { age: 1 } }

$mul	Sayısal bir değeri çarpar.	{ $mul: { age: 2 } }

$rename	Bir alanın adını değiştirir.	{ $rename: { name: "fullName" } }

$push	Bir dizinin sonuna eleman ekler.	{ $push: { tags: "new" } }

$pull	Diziden belirli bir elemanı kaldırır.	{ $pull: { tags: "old" } }

$addToSet	Dizide zaten yoksa eleman ekler.	{ $addToSet: { tags: "unique" } }

*/
