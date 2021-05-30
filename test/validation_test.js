const assert = require('assert');
const User = require('../src/user')

describe('Validating records', () => {
    it('requires a username', (done) => {
        const user = new User({ name: undefined });
        //for instant validation result we will use validateSync operator
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required.');
        done();
    })

    it('requires a user name longer than 2 characters', (done) => {
        const user = new User({ name: 'Al' });
        //for instant validation result we will use validateSync operator
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.');
        done();
    })

    it('disallows invalid records from being saved', (done) => {
        const user = new User({ name: 'Al' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 characters.');
                done();
            })
    });
})
