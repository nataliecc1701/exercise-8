describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
      billAmtInput.value = '20';
      tipAmtInput.value = '4';
    });
  
    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
      submitPaymentInfo();
  
      expect(Object.keys(allPayments).length).toEqual(1);
      expect(allPayments['payment' + paymentId].billAmt).toEqual('20');
      expect(allPayments['payment' + paymentId].tipAmt).toEqual('4');
    });

    it('should update the servers table on submitPaymentInfo', function() {
      // Make sure there's a server
      serverNameInput.value = 'Alice';
      submitServerInfo();

      submitPaymentInfo();
      expect(document.querySelector('#serverTable tbody').innerText).toContain('$4.00');
    })

    it('should create a payment on createCurPayment with positive bill and nonnegative tip', function(){
      expect(createCurPayment()).toEqual({
        billAmt:'20',
        tipAmt:'4',
        tipPercent:20
      })
      billAmtInput.value = 0;
      expect(createCurPayment()).toBeUndefined();

      billAmtInput.value = 20;
      tipAmtInput.value = 0;
      expect(createCurPayment()).toEqual({
        billAmt:'20',
        tipAmt:'0',
        tipPercent:0
      })

      tipAmtInput.value = -1;
      expect(createCurPayment()).toBeUndefined();

      tipAmtInput.value = 4
      billAmtInput.value = -20;
      expect(createCurPayment()).toBeUndefined();
    })

    it('should add a row on appendPaymentTable',function(){
      appendPaymentTable(createCurPayment());
      const paymentRows = document.querySelector("#paymentTable tbody").querySelectorAll('tr');
      expect(paymentRows.length).toEqual(1);
    })

    it('should set the average values on updateSummary',function(){
      allPayments['payment0'] = createCurPayment();
      updateSummary();
      expect(summaryTds[0].innerText).toContain('20');
      expect(summaryTds[1].innerText).toContain('4');
      expect(summaryTds[2].innerText).toContain('20%')
    })
  
    afterEach(function() {
    // reset the payments data
    allPayments = {};
    paymentID = 0;
    billAmtInput.value = 0;
    tipAmtInput.value = 0;
    // clear the payments table
    const paymentTableBody = document.querySelector('#paymentTable tBody');
    const paymentTableRows = paymentTableBody.querySelectorAll('tr');
    for(let row of paymentTableRows){
      row.remove();
    }
    // reset the shift summary
    updateSummary();

    // reset the servers data
    allServers = {};
    serverID = 0;
    serverNameInput.value = '';
    updateServerTable();
    });
  });