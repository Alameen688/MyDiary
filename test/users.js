/* eslint-env mocha */
/* eslint no-unused-vars: 0 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';

/** disabled no-unused-vars for this file
 *  to prevent 'should' from throwing error
 * on this line based on airbnb style guide
 * */
const should = chai.should();

chai.use(chaiHttp);

const userCredentials = {
  email: 'tester@mydiary.com', 
  password: 'tester'
}

const userCredentialsUpdate = {
  fullname: 'Tested Editor',
  email: 'tester@mydiary.com', 
}

const onNotificationData = {
  status: 'on',
}

const offNotificationData = {
  status: 'off',
}

let token = '';

describe('Users route', ()=>{
  before((done)=>{
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        if (err) throw err;                  
        token = res.body.data.token;
        res.should.have.status(200);
        done();
      });
  });

  it('should return 200 and update details of a logged in user', (done) => {
    chai.request(server)
      .put(`/api/v1/users/update`)
      .set('Authorization', `Bearer ${token}`)
      .send(userCredentialsUpdate)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.data.should.be.a('object');
        done();
      });
  });

  it('should return 200 and set user notification status to on', (done) => {
    chai.request(server)
      .put(`/api/v1/users/notification`)
      .set('Authorization', `Bearer ${token}`)
      .send(onNotificationData)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.data.should.be.a('object');
        done();
      });
  });

  it('should return 200 and set user notification status to off', (done) => {
    chai.request(server)
      .put(`/api/v1/users/notification`)
      .set('Authorization', `Bearer ${token}`)
      .send(offNotificationData)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.data.should.be.a('object');
        done();
      });
  });

  it('should return 200 status and get user profile', (done) => {
    chai.request(server)
      .get('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.status.should.equal('success');
        done();
      });
  });
  
})