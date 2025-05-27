import spade from "../../assets/Spade.svg";
import club from "../../assets/Clubs.svg";
import diamond from "../../assets/Diamonds.svg";
import heart from "../../assets/Heart.svg";
import suitbg from "../../assets/suit_bg.jpg";
import type { CardInterface, Suit } from "../../utils/enum";
import './deck-card.css'

const suitImages: Record<Suit, string> = {
  spade: spade,
  heart: heart,
  diamond: diamond,
  club: club,
};

type CardSize = 'xs' |'sm' | 'md' | 'xl';

interface DeckCardProps extends CardInterface {
  size?: CardSize;
}

const DeckCard = ({ id, suit, rank, showcard = false, size = 'xs' }: DeckCardProps) => {
  const color: "black" | "red" =
    suit === "club" || suit === "spade" ? "black" : "red";
  const imgSrc = suitImages[suit];

  return (
    <div 
      className={`card-class ${color}_card ${!showcard ? "flipped" : ""}`} 
      key={id}
    >
      <div className="card-inner">
        <div className={`card-front ${color}_card ${size}_card`}>
          <div className="card-top-portion">
            <div className="item-section">
              <h6>{rank}</h6>
              <img 
                src={imgSrc} 
                alt={`${suit} suit`} 
              />
            </div>
          </div>
          <div className="middle-section">
            <img 
              src={imgSrc} 
              alt={`${suit} suit`} 
            />
          </div>
          <div className="card-bottom-portion">
            <div className="item-section">
              <h6>{rank}</h6>
              <img 
                src={imgSrc} 
                alt={`${suit} suit`} 
              />
            </div>
          </div>
        </div>

        <div className="card-back">
          <img src={suitbg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
