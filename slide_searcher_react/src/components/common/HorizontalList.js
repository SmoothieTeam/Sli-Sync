import { useEffect, useState } from "react";


function HorizontalList({ className, children }) {
  const [listRef, setListRef] = useState();
  const onWheel = (e) => {
    e.preventDefault();
    listRef.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    if (listRef) {
      listRef.addEventListener('wheel', onWheel, {passive: false});
      return () => listRef.removeEventListener('wheel', onWheel, {passive: false});
    }
  }, [listRef]);

  return <div className={className} role="list" ref={setListRef}>{children}</div>;
};

export default HorizontalList;