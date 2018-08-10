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

const userCredentials = {
  email: 'tester@mydiary.com', 
  password: 'tester'
}

const newEntry = {
  title: 'Setting up testing',
  content: `I've heard about testing before but never had a reason to take it so serious
    until the bootcamp challenge came in.`,
};

const invalidEntries = [
  {
    title: 'Only has title'
  },
  {
    content: 'Only has content'
  }
];

let token = "";
let id = "";

describe('Entries route', () => {

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

  describe('/POST method', () => {
    it('should create a new entry and return 201 status', (done) => {
      chai.request(server)
        .post('/api/v1/entries')
        .set('Authorization', `Bearer ${token}`)
        .send(newEntry)
        .end((err, res) => {
          id = res.body.data.id;
          res.should.have.status(201);
          res.body.data.should.be.a('object');
          done();
        });
    });
  
    it('should return 400 status with errors when any required property is not passed', (done) => {
      /** generate random number between 0 and 1, 1 inclusive**/
      let i = Math.floor(Math.random() * 1);
      //select an entry to use at random (from one without content, one without title)
      let invalidEntry = invalidEntries[i];
      chai.request(server)
        .post('/api/v1/entries')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidEntry)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status');
          res.body.status.should.equal('error');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('array');
          done();
        })
    });
  
  });

  describe('/GET method', () => {
    it('should return 200 status and get all the entries', (done) => {
      chai.request(server)
        .get('/api/v1/entries')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal('success');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          done();
        });
    });

    it('should return 200 status and get an entry by a given id', (done) => {
      chai.request(server)
        .get(`/api/v1/entries/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.data.should.be.a('object');
          done();
        });
    });
    
  });

  describe('/PUT method', () => {
    const entryUpdate = {
      title: 'Setting up testing (update)',
      content: `I've heard about testing before but never had a reason to take it so serious
        until the Andela circle 34 bootcamp challenge came in.`,
    };
  
    it('should return 200 and update an entry by a given id', (done) => {
      chai.request(server)
        .put(`/api/v1/entries/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(entryUpdate)
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
  
    it('should return 400 satus with errors when invalid id is used', (done) => {
      chai.request(server)
        .put('/api/v1/entries/054c0398f7c70b2e')
        .set('Authorization', `Bearer ${token}`)
        .send(entryUpdate)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('status');
          response.body.status.should.equal('error');
          response.body.should.have.property('errors');
          response.body.errors.should.be.a('Array');
          done();
        });
    });
  
    it('should return 404 status when id is not found', (done) => {
      chai.request(server)
        .put('/api/v1/entries/50002')
        .set('Authorization', `Bearer ${token}`)
        .send(entryUpdate)
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  
    it('should return 400 status with errors when any required property is not passed', (done) => {
      let i = Math.floor(Math.random() * 1);
      let invalidEntry = invalidEntries[i];
      chai.request(server)
        .put(`/api/v1/entries/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(invalidEntry)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status');
          res.body.status.should.equal('error');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('array');
          done();
        })
    });
  });
  
  describe('/DELETE method', () => {

    it('should 204 status after deleting an entry by a given id', (done) => {
      chai.request(server)
        .delete(`/api/v1/entries/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, response) => {
          response.should.have.status(204);
          done();
        });
    });
  
    it('should return 404 status when id of entry to delete is not found', (done) => {
      chai.request(server)
        .delete('/api/v1/entries/500056')
        .set('Authorization', `Bearer ${token}`)
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('Unknown route', () => {
    it('should return a 404 error with an error message', (done) => {
      chai.request(server)
        .get('/api/v1/entri')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.body.should.have.property('status');
          res.body.status.should.equal('error');
          done();
        });
    });
  });

})

