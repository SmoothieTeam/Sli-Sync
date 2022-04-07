const useClipboard = (link) => {
  const copy = () => navigator.clipboard.writeText(link);

  return {
    copy
  };
};

export {
  useClipboard
};