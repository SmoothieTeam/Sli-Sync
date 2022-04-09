const useClipboard = () => {
  const copyToClipboard = (value) => {
    navigator.permissions.query({name:"clipboard-write"}).then((result) => {
      if(result.state === 'granted') {
        navigator.clipboard.writeText(value);
      }
    });  
  };

  return {
    copyToClipboard
  };
};

export {
  useClipboard
};