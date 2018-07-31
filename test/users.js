/* eslint-env mocha */
/* eslint no-unused-vars: 0 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../dist/server';

/** disabled no-unused-vars for this file
 *  to prevent 'should' from throwing error
 * on this line based on airbnb style guide
 * */
const should = chai.should();

chai.use(chaiHttp);
let randNum = Math.floor(Math.random() * 125);
let newUser = {
  fullname: 'Tester Testing',
  email: `test${randNum}@example.com`,
  password: 'tester'
}

describe('Users route', ()=>{
  it('should return 201 status and create a new user', (done)=>{
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.should.be.a('object');
        done();
      })    
  });

  it('should return 200 status and login an existing user', (done)=>{
    let loginInfo = {
      email: newUser.email,
      password: newUser.password
    }
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('object');
        done();
      })    
  })
  
})