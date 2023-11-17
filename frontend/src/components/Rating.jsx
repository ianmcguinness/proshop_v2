import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, numReviews }) => {
  return (
    <div className='rating'>
      {[...Array(5).keys()].map(x => (
        <span key={x}>
          {value <= x ? (
            <FaRegStar />
          ) : value <= x + 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaStar />
          )}
        </span>
      ))}
      <span className='rating-text'>{`from ${numReviews} ${
        numReviews === 1 ? 'review' : 'reviews'
      }`}</span>
    </div>
  )
}
export default Rating
