import "./LoadingAnimation.css";

function LoadingAnimation({ className }) {
  return (
    <div className={`loading-animation ${className}`}>
      <div className="loading-animation__background">
        <img
          className="loading-animation__animation-image animation-image--first"
          src="Loaing_Animation.png"
        />
        <img
          className="loading-animation__animation-image animation-image--second"
          src="Loaing_Animation.png"
        />
      </div>
    </div>
  );
}

export default LoadingAnimation;
