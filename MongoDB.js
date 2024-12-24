/* MongoDB */

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
use("shop");
db.electronics.findOneAndUpdate(
  { price: { $lt: 200 } },
  { $inc: { price: 100 } },
  { sort: { price: 1 },returnNewDocument:true }
);


use("shop");
db.electronics.find();

use('shop');
db.electronics.updateMany({price:250},{$set:{name:"Woooow"}});

use('shop');
db.electronics.deleteOne({name:'Woooow'});


use('shop');
db.electronics.findOneAndDelete({name:'Woooow'});


use('shop');
db.electronics.deleteMany({name:'Woooow'});

use('shop');
db.electronics.deleteMany({});


/* 
MongoDB'de Aggregation (Toplama), veri üzerinde karmaşık sorgular ve
 işlemler yaparak sonuçlar üretmek için kullanılan güçlü bir çerçevedir. 
 Aggregation işlemleri, bir veri koleksiyonu üzerinde bir dizi aşamayı (pipeline) 
 uygulayarak çalışır ve genellikle veri analizi, raporlama ve dönüşüm işlemleri için kullanılır.

 Aggregation Pipeline:

Veri, birden fazla aşamadan (stage) geçirilir.
Her aşama, veriyi bir işlemden geçirir ve bir sonraki aşamaya aktarır.
Sırasıyla uygulanan işlemlerden oluşan bir zincir gibidir.

Aggregation Aşamaları (Stages)
1. $match (Filtreleme)
Belirli bir koşulu sağlayan belgeleri filtreler. WHERE koşuluna benzer.
{ $match: { age: { $gte: 30 } } }

2. $group (Gruplama)
Belirli bir alana göre verileri gruplar ve hesaplamalar yapar. GROUP BY işlemi gibidir.
{
  $group: {
    _id: "$department",
    totalSalary: { $sum: "$salary" },
    avgAge: { $avg: "$age" }
  }
}

3. $project (Alan Seçimi)
Sadece belirli alanları seçer, yeni alanlar oluşturur veya mevcut alanları dönüştürür.
{ $project: { name: 1, salary: 1, bonus: { $multiply: ["$salary", 0.1] } } }

4. $sort (Sıralama)
Sonuçları belirli bir alana göre sıralar.
{ $sort: { age: -1 } } // Yaş alanına göre azalan sıralama

5. $limit ve $skip (Sonuç Sınırlandırma)
$limit: Sonuçlardan belirli bir sayıda belge döndürür.
$skip: Belirli bir sayıda belgeyi atlar.

{ $limit: 5 } // İlk 5 belge
{ $skip: 10 } // İlk 10 belgeyi atla

6. $unwind (Diziyi Ayrıştırma)
Bir belgedeki diziyi genişleterek, her eleman için ayrı bir belge oluşturur.
{ $unwind: "$tags" }

7. $lookup (İlişkisel Bağlantı)
Bir koleksiyondan diğerine JOIN yapar.
{
  $lookup: {
    from: "orders",
    localField: "customerId",
    foreignField: "_id",
    as: "customerOrders"
  }
}

8. $addFields (Yeni Alan Ekleme)
Belgelerde yeni alanlar oluşturur veya mevcutları değiştirir.
{ $addFields: { totalCost: { $add: ["$price", "$tax"] } } }

***************************
Aggregation Operatörleri
***************************
Aggregation işlemlerinde kullanılan fonksiyonlar:

$sum	Toplama yapar.	{ $sum: "$sales" }
$avg	Ortalama hesaplar.	{ $avg: "$age" }
$min	Minimum değeri bulur.	{ $min: "$age" }
$max	Maksimum değeri bulur.	{ $max: "$age" }
$push	Değerleri bir diziye iter.	{ $push: "$name" }
$first	İlk değeri alır.	{ $first: "$createdAt" }
$last	Son değeri alır.	{ $last: "$createdAt" }
*/


use("okul");
db.grades.insertMany([
  { _id: 1, name: "John Doe", assignment: 101, points: 85 },
  { _id: 2, name: "Jane Smith", assignment: 102, points: 90 },
  { _id: 3, name: "Alice Johnson", assignment: 103, points: 78 },
  { _id: 4, name: "Bob Brown", assignment: 104, points: 88 },
  { _id: 5, name: "Charlie Davis", assignment: 105, points: 92 },
  { _id: 6, name: "David Wilson", assignment: 106, points: 81 },
  { _id: 7, name: "Eve Clark", assignment: 107, points: 87 },
  { _id: 8, name: "Frank Haris", assignment: 108, points: 79 },
  { _id: 9, name: "Grace Lewis", assignment: 109, points: 94 },
  { _id: 10, name: "Hannah Walker", assignment: 110, points: 83 }
]);

use("okul");
db.grades.insertMany([
    { _id: 11, name: "Liam Doe", assignment: 101, points: 88 },
    { _id: 12, name: "Emma Smith", assignment: 102, points: 91 },
    { _id: 13, name: "Noah Johnson", assignment: 103, points: 76 },
    { _id: 14, name: "Olivia Brown", assignment: 104, points: 85 },
    { _id: 15, name: "James Davis", assignment: 105, points: 90 },
  ]);

use("okul");
db.grades.find();

use("okul");
db.grades.aggregate({$group:{"_id":"$assignment","total_points":{$sum:"$points"}}});

use('okul');
var pipeline=[
    {$match:{"assignment":{$lt:104}}},
    {$group:{"_id":"$assignment","max_point":{$max:"$points"}}},
    {$sort:{"max_point":-1}}
];
db.grades.aggregate(pipeline);


use('okul');
var pipeline=[
    {$match: {"name":{$regex:"^J"}}},
    {$group:{"_id":null,"total_points":{$sum:"$points"}}}];
db.grades.aggregate(pipeline);

use('okul');
var pipeline=[
    {$match: {"name":{$regex:"^J"}}},
    {$group:{"_id":null,"total_points":{$sum:"$points"}}}];
db.grades.aggregate(pipeline);


use('okul');
db.grades.find({"points":{$lt:80}}).count();

use('okul');
var pipeline=[
    {$match: {"points":{$lt:80}}},
    {$count: 'sonuc'}];
db.grades.aggregate(pipeline);