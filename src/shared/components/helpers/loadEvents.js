import { useState, useEffect, useRef } from 'react';

function loadEvents(fetchInitialData, staticContext) {
  const [events, setEvents] = useState(() => {
    if (__isBrowser__) {
      if (window.location.pathname !== document.getElementById('path').value) {
        return null;
      }
      return JSON.parse(document.getElementById('initial-data').innerHTML);
    }
    return staticContext.data;
  });

  const [loading, setLoading] = useState(
    !events,
  );

  const fetchNewEvents = useRef(
    !events,
  );

  useEffect(() => {
    if (fetchNewEvents.current === true) {
      setLoading(true);

      fetchInitialData()
        .then((data) => {
          setEvents(data);
          setLoading(false);
        });
    } else {
      fetchNewEvents.current = true;
    }
  }, [fetchNewEvents]);

  return {
    loading,
    events,
  };
}

export default loadEvents;
