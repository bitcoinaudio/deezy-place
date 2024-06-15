/* eslint-disable react/forbid-prop-types */
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import ProductBid from "@components/product-bid";
import { useWallet } from "@context/wallet-context";
import { ImageType } from "@utils/types";
import { shortenStr, MEMPOOL_API_URL } from "@services/nosft";
import { InscriptionPreview } from "@components/inscription-media-view";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CardOptions = dynamic(() => import("@components/card-options"), {
  ssr: false,
});

const OrdinalCard = ({
  overlay,
  price,
  type,
  utxo,
  authors,
  confirmed,
  date,
  onSale,
  onClick,
}) => {
  const { nostrOrdinalsAddress } = useWallet();

  const path = utxo?.inscriptionId
    ? `/inscription/${utxo?.inscriptionId}`
    : `/output/${utxo?.txid}:${utxo?.vout}`;

  return (
          <div className="media-card">
            <InscriptionPreview utxo={utxo} />
            {utxo?.auction && (
              <div className="card-tag">
                <p>Live Auction</p>
              </div>
            )}
          </div>
          
  );
};

OrdinalCard.propTypes = {
  overlay: PropTypes.bool,

  // description: PropTypes.string.isRequired,
  price: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
  }),
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      image: ImageType.isRequired,
    }),
  ),
  utxo: PropTypes.object,
  confirmed: PropTypes.bool,
  date: PropTypes.number,
  type: PropTypes.oneOf(["buy", "sell", "send", "view"]),
  onSale: PropTypes.func,
  onClick: PropTypes.func,
};

OrdinalCard.defaultProps = {
  overlay: false,
};

export default OrdinalCard;
