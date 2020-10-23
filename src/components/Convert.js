import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  // UseEffect to run when 'text' prop changes.
  // It starts a timer and after 500ms set DebouncedText. 
  // If, changes happens before 500ms, it cancels the previous timer and starts a new one.
  useEffect(() => {
    const timerId = setTimeout(() => {
        setDebouncedText(text);
    }, 500);

    // CleanUp Function to clear the Previous Timer
    return () => {
        clearTimeout(timerId);
    };
  }, [text]);

  // UseEffect to run when 'debouncedText' changes.
  useEffect(() => {
    // Helper Function to add async keyword. As, we can place directly in useEffect.
    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: text,
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
          },
        }
      );

      // First 'data' is of axios data and then next 'data' is of actual response we got from the api.
      setTranslated(data.data.translations[0].translatedText);
    };

    // Invoke the helper Function
    doTranslation();
  }, [language, debouncedText]);

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;
