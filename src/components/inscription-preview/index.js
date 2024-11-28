import { useState } from "react";
import PropTypes from "prop-types";
import { isImageInscription } from "@services/nosft";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

let ORDINALS_EXPLORER_URL = "https://radinals.bitcoinaudio.co";
//  let ORDINALS_EXPLORER_URL = "http://localhost";

export const InscriptionPreview = ({ utxo }) => {
    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
        setLoading(false);
    };

    const renderImage = () => {
        if (!utxo) {
            return <Skeleton height={160} style={{ lineHeight: 3 }} />;
        }

        if (isImageInscription(utxo) || !utxo.inscriptionId) {
            let imgUrl = `${ORDINALS_EXPLORER_URL}/content/${utxo.inscriptionId}`;
            if (!utxo.inscriptionId) {
                imgUrl = "/images/logo/bitcoin.png";
            }
            return <img src={imgUrl} alt={utxo.txId} onLoad={handleLoad} loading="lazy" />;
        }

        return (
            <iframe
                id={`iframe-${utxo.inscriptionId}`}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
                title={utxo.inscriptionId}
                onLoad={handleLoad}
                src={`${ORDINALS_EXPLORER_URL}/content/${utxo.inscriptionId}`}
                style={{ visibility: loading ? "hidden" : "visible" }}
            />
        );
    };

    return (
        <SkeletonTheme baseColor="#13131d" highlightColor="#242435">
            <div style={{ position: "relative" }}>{renderImage()}</div>
        </SkeletonTheme>
    );
};

InscriptionPreview.propTypes = {
    utxo: PropTypes.shape({
        content_type: PropTypes.string,
        inscriptionId: PropTypes.string,
        txId: PropTypes.string,
    }),
};
