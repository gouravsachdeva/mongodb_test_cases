const assert = require('assert');
const User = require('../src/user')

describe('Reading records out of the database', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });

        joe.save()
            .then(() => {
                done();
            })
    })

    it('Find all users with the name of Joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString())
                done();
            });
    });

    it('Find a specific user with the perticular _id', (done) => {
        User.findOne({ _id: joe._id })
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            })
    })
});