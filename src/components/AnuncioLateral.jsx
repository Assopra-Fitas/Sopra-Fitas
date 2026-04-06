import React, { useMemo } from "react";

const AnuncioLateral = ({ adKey, width, height }) => {
  const adContent = useMemo(() => {
    const cacheBuster = Date.now();
    return `
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
          <script src="https://www.highperformanceformat.com/${adKey}/invoke.js?t=${cacheBuster}"><\/script>
        </body>
      </html>
    `;
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
        title="Publicidade"
        srcDoc={adContent}
        width={width}
        height={height}
        scrolling="no"
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
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
