import styles from './Score.module.scss';

const Score = ({ score }) => {
  const circleRadius = 40;
  const roundCircum = 2 * circleRadius * Math.PI;
  const percentage = 100 / (10 / score);
  const roundDraw = (percentage * roundCircum) / 100;

  let strokeColorClass = 'stroke-white';

  if (score > 8) {
    strokeColorClass = 'stroke-green-500';
  } else if (score > 7) {
    strokeColorClass = 'stroke-lime-500';
  } else if (score > 6) {
    strokeColorClass = 'stroke-yellow-500';
  } else if (score > 5) {
    strokeColorClass = 'stroke-amber-500';
  } else if (score > 4) {
    strokeColorClass = 'stroke-orange-500';
  } else if (score > 3) {
    strokeColorClass = 'stroke-red-500';
  } else if (score <= 3) {
    strokeColorClass = 'stroke-red-800';
  }

  return (
    <div className="absolute flex items-center justify-center text-center text-sm rounded-full w-10 h-10 top-4 right-4 bg-stone-800 text-slate-100 fill-none">
      <svg
        className={
          'absolute z-1 top-0 left-0 w-full h-full ' +
          strokeColorClass +
          ' ' +
          styles['svg-score']
        }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ strokeDasharray: roundDraw + ' 999' }}
      >
        <circle cx="50" cy="50" r={circleRadius} />
      </svg>
      <span className="z-10">{score}</span>
    </div>
  );
};

export default Score;
