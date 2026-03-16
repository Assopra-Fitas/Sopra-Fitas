import React, { useEffect, useRef } from "react";

const AnuncioLateral = ({ adKey, width, height }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !adKey) return;

    const doc = iframe.contentWindow.document;

    const adContent = `
      <!DOCTYPE html>
      <html style="margin:0;padding:0;overflow:hidden;">
        <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:#252525;">
          
          <script>
            atOptions = {
              'key' : '${adKey}',
              'format' : 'iframe',
              'height' : ${height},
              'width' : ${width},
              'params' : {}
            };
          </script>

          <script src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>

        </body>
      </html>
    `;

    try {
      doc.open();
      doc.write(adContent);
      doc.close();
    } catch (err) {
      console.error("Erro ao carregar anúncio:", err);
    }
  }, [adKey, width, height]);

  return (
    <div
      style={{
        margin: "10px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: height,
        width: "100%",
      }}
    >
      <iframe
        ref={iframeRef}
        title="Publicidade"
        width={width}
        height={height}
        loading="lazy"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        referrerPolicy="no-referrer"
        style={{
          border: "none",
          overflow: "hidden",
          borderRadius: "8px",
          background: "#252525",
          maxWidth: "100%",
        }}
      />
    </div>
  );
};

export default AnuncioLateral;