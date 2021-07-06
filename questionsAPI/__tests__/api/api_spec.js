const frisby = require('frisby');
const Joi = frisby.joi;

it ('PUT Question helpfulness should return a status of 200 OK', function () {
  return frisby
  .put('http://localhost:3000/qa/questions/5/helpful')
  .expect('status', 200);
});

it ('PUT Answer helpfulness should return a status of 200 OK', function () {
  return frisby
  .put('http://localhost:3000/qa/answers/5/helpful')
  .expect('status', 200);
});

it('should be 200', function () {
  return
    frisby.get('http://localhost:3000/qa/questions/1')
    .expect('status', 200);
}, 40000);

// it ('POST to add answer should return a status of 201 Created', function () {
//   return frisby
//     .post('http://localhost:3000/qa/questions/1/answers', {
//       body: "dont shop here",
//       name: "amazonkun",
//       email: "kys@mailz.com",
//       photos: []
//   }, {json: true}, {headers: {'Content-Type': 'application/json'}})
//     .expect('status', 201);
// });