var chai = require('chai');
var _ = require('lodash');

var expect = chai.expect;


describe('lazy evaluation tests', function() {
    it('using underscore: _(someArray)', function() {
        let a = new Array(10);
        let result = _(a).map(x => "zzz").value();
        expect(result.length).to.equal(10);
    });

    it('Forcing evaluation on _(someArray) with reduce', function() {
        let a = new Array(10);

        let result = _(a)
            .map(x => "zzz")
            // .map(x => {console.log("tapping: " + x); return x;})
            .reduce((acc, n) => n, '');

        expect(result).to.equal('zzz');
    });

    // it('can pipe stuff out', function() {
    //     _(Array(20)).forEach((v,i) => {
    //         console.log(`value: ${v}; i: ${i}`);
    //         console.log(i < 20-1? ',': '');
    //     });
    // });

    // it('can pipe stuff out via process.stdout', function() {
    //     process.stdout.write('[\n')
    //     _(Array(20)).forEach((v,i) => {
    //         process.stdout.write(`{ x : ${i} }`);
    //         process.stdout.write(i < 20-1? ',\n': '');
    //     });
    //     process.stdout.write('\n]')
    // });

    // it('can use generator function', function() {
    //     function* nItems(n) {
    //         let count = n;
    //         let index = 0;
    //         while (index < count)
    //             yield index++;
    //     }

    //     let gen = nItems(10);

    //     _(Array(20)).forEach((v,i) => console.log(`value: ${v}; i: ${i}`));
    // });

});
