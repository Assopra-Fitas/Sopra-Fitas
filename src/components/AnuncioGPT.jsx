import React, { useEffect, useRef } from 'react';

const AnuncioGPT = ({ adId }) => {
  const displayed = useRef(false);

  useEffect(() => {
    if (displayed.current) return;
    displayed.current = true;

    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(function () {
      googletag.display(adId);
    });
  }, [adId]);

  return (
    <div
      style={{
        margin: '10px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 250,
        width: '100%',
      }}
    >
      <div
        id={adId}
        style={{ minWidth: 250, minHeight: 250 }}
      />
    </div>
  );
};

export default AnuncioGPT;
