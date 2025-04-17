const parseTextBlock = (textBlock) => {
  try {
    const lines = textBlock.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(line => {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        return [key.trim().toLowerCase(), value];
      });

    const parsedData = Object.fromEntries(lines);
    
    // Ensure all values are strings
    return Object.entries(parsedData).reduce((acc, [key, value]) => {
      acc[key] = value ? String(value).trim() : '';
      return acc;
    }, {});
  } catch (error) {
    console.error('Error parsing text block:', error);
    throw new Error('Invalid format. Please use the format: Key: Value, one per line');
  }
};

export { parseTextBlock };
