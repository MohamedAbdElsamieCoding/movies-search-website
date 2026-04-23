interface Props {
  onClose: () => void;
  trailerKey: string;
}

const TrailerModal = ({ onClose, trailerKey }: Props) => {
  return (
    <div className="trailer_modal">
      <div className="trailer_overlay" onClick={onClose} />
      <div className="trailer_content">
        <iframe
          width="900"
          height="500"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
