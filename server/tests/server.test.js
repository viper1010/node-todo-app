const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');

beforeEach((done) => {
  Todo.remove({}).then(()=>done())
})

describe('Post /todos', ()=>{

  it('should create a Todo', (done) => {
    let text = 'New Todo from test';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e))
      })
  })

  it('should fail to create a Todo', (done)=>{
    let text = "";

    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos)=>{
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e))
      });

  });

});
