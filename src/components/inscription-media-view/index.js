import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


let ORDINALS_EXPLORER_URL = "https://radinals.bitcoinaudio.co";
 
export const InscriptionPreview = ({ utxo }) => {
    const [loading, setLoading] = useState(true);
    const [hasMedia, setHasMedia] = useState(false);

    useEffect(() => {
        const fetchAndParseHtml = async () => {
          if (utxo.content_type == "text/html;charset=utf-8") {
            try {
              const response = await fetch(`${ORDINALS_EXPLORER_URL}/content/${utxo.inscriptionId}`);
              const html = await response.text();
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const hasAudio = doc.querySelector('audio');
              const hasVideo = doc.querySelector('video');
              if (hasAudio || hasVideo) {
                setHasMedia(true);
              }
            } catch (error) {
              console.error('Failed to fetch and parse HTML:', error);
            }
          }
        };
    
        fetchAndParseHtml();
      }, [utxo]);

    const handleLoad = () => {  
        setLoading(false);
    };

    const renderMedia = () => {
        if (!utxo || !hasMedia) {
            return <Skeleton height={160} style={{ lineHeight: 3 }} />;
        }

       if (utxo.content_type == "text/html;charset=utf-8" || hasMedia) {

         return (
            
            <iframe
                id={`iframe-${utxo.inscriptionId}`}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
                title={utxo.inscriptionId}
                onLoad={handleLoad}
                src={`${ORDINALS_EXPLORER_URL}/content/${utxo.inscriptionId}`}
                style={{ visibility: loading ? "hidden" : "visible" }}
                allowFullScreen={true}
                height={"600px"}
            />

        );

       }

    };

    return (
            <div style={{ position: "relative", height: "600px", width: "500px"}}>{renderMedia()}</div>
    );
};

InscriptionPreview.propTypes = {
    utxo: PropTypes.shape({
        content_type: PropTypes.string,
        inscriptionId: PropTypes.string,
        txId: PropTypes.string,
    }),
};
