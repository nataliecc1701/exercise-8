describe("Helper function test (with setup and tear-down)", function() {
    beforeEach(function () {
        // initialization logic
    });

    it('should sum up multiple payments', function(){
        // build the payments object
        allPayments['payment0'] = {
            billAmt:20,
            tipAmt:4,
            tipPercent:20
        }
        allPayments['payment1'] = {
            billAmt:100,
            tipAmt:0,
            tipPercent:0
        }
        allPayments['payment2'] = {
            billAmt:50,
            tipAmt:15,
            tipPercent:30
        }
        expect(sumPaymentTotal('billAmt')).toEqual(170);
        expect(sumPaymentTotal('tipAmt')).toEqual(19);
        expect(sumPaymentTotal('tipPercent')).toEqual(50); // this is meaningless, but
        // the function spec says it can, so we test it anyway
    })

    it('should calculate a tip percentage',function(){
        expect(calculateTipPercent(20,4)).toEqual(20);
        expect(calculateTipPercent(100,0)).toEqual(0);
        expect(calculateTipPercent(50,15)).toEqual(30);
        expect(calculateTipPercent(60,9)).toEqual(15);
        expect(calculateTipPercent(80,10)).toEqual(13);
    })

    it('should add a table cell',function(){
        const testTr = document.createElement('tr');
        appendTd(testTr, 'test text');
        expect(testTr.innerText).toContain('test text');
    })
    
    afterEach(function() {
        // reset the servers data
        allPayments = {};
    });
})
