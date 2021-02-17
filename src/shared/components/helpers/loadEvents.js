import { useState, useEffect, useRef } from 'react';

function loadEvents(fetchInitialData, staticContext, setInterval) {
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

  const callEvents = () => {
    fetchInitialData()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (fetchNewEvents.current === true) {
      setLoading(true);
      callEvents();
    } else {
      fetchNewEvents.current = true;
    }

    if (__isBrowser__ && setInterval) {
      const interval = window.setInterval(() => {
        callEvents();
      }, 12000);
      return () => clearInterval(interval);
    }
    return null;
  }, [fetchNewEvents]);

  return {
    loading,
    events,
  };
}

export default loadEvents;
