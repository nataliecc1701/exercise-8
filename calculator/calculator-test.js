
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({
    amount: 10000,
    years: 2,
    rate: 0.00000001,
   })).toEqual("416.67");
   expect(calculateMonthlyPayment({
    amount: 1000,
    years: 10,
    rate: .12,
   })).toEqual("14.35");
});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({
    amount:9004.10,
    years:1,
    rate:0.12
  })).toEqual("800.00")
  expect(calculateMonthlyPayment({
    amount:9005.20,
    years:1,
    rate:0.12
  })).toEqual("800.10")
});

it('should handle absurd interest rates', function() {
  expect(calculateMonthlyPayment({
    amount:1000,
    years:1,
    rate:1,
  })).toEqual("135.00")
});

/// etc
