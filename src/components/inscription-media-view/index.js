import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isImageInscription, isTextInscription } from "@services/nosft";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";



let ORDINALS_EXPLORER_URL = "https://radinals.bitcoinaudio.co";
// let ORDINALS_EXPLORER_URL = "http://localhost";
 
export const InscriptionPreview = ({ utxo }) => {
    const [loading, setLoading] = useState(true);
   
    const handleLoad = () => {  
        setLoading(false);
    };

    const renderMedia = () => {
        if (!utxo) {
            return;
        }
        // if (isImageInscription(utxo) || !utxo.inscriptionId) {
        //     let imgUrl = `${ORDINALS_EXPLORER_URL}/content/${utxo.inscriptionId}`;
        //     if (!utxo.inscriptionId) {
        //         imgUrl = "/images/logo/bitcoin.png";
        //     }
        //     return <img src={imgUrl} alt={utxo.txId} onLoad={handleLoad} loading="lazy" />;
        // }

       if (utxo.content_type == "text/html;charset=utf-8" ) {

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

       } else {
        return ;
       }

    };

    return (
        <SkeletonTheme baseColor="#13131d" highlightColor="#242435">
            <div style={{ position: "relative", height: "600px", width: "500px"}}>{renderMedia()}</div>
            </SkeletonTheme>    );
};

InscriptionPreview.propTypes = {
    utxo: PropTypes.shape({
        content_type: PropTypes.string,
        inscriptionId: PropTypes.string,
        txId: PropTypes.string,
    }),
};
