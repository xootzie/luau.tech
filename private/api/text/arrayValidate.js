const arrayValidateHandler = async (req, res) => {
    
    try {
      const { array } = req.body;
      let normalizedArray = [];
      let isValid = false;
  
      if (Array.isArray(array)) {
        isValid = true;
        normalizedArray = array;
      } else if (typeof array === 'string') {
        let arrayString = array.trim();
        if (arrayString.startsWith('[') && arrayString.endsWith(']')) {
          arrayString = arrayString.slice(1, -1);
        }
        const elements = arrayString.split(',').map(item => item.trim()).filter(item => item !== '');
  
        isValid = elements.length > 0 &&
          !arrayString.includes(',,') &&
          !arrayString.endsWith(',') &&
          (array.trim().startsWith('[') === array.trim().endsWith(']'));
  
        if (isValid) {
          normalizedArray = elements;
        }
      }
  
      if (isValid) {
        normalizedArray = normalizedArray.map(element => {
          if (typeof element === 'string') {
            element = element.replace(/^"|"$/g, '');
            const num = Number(element);
            return isNaN(num) ? element : num;
          } else if (typeof element === 'number') {
            return element;
          } else {
            return element.toString();
          }
        });
      }
  
      res.json({
        isValid,
        normalizedArray: isValid ? normalizedArray : []
      });
    } catch (error) {
      console.error('Error validating array:', error);
      res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
};

module.exports = { arrayValidateHandler };