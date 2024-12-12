const taxCalculator = async (req, res) => {

    const { amount } = req.query;
  
    if (!amount || isNaN(parseFloat(amount))) {
      return res.status(400).json({ error: 'Invalid amount parameter' });
    }
    const robuxAmount = parseFloat(amount) * 0.7;
  
    res.json({ result: robuxAmount.toFixed(2) });
  };

  module.exports = { taxCalculator };

