import { Star } from 'lucide-react'

interface ReviewCardProps {
  name: string
  rating: number
  reviewText: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, reviewText }) => {
  return (
    <div
      key={name}
      className="h-full bg-card p-8 rounded-2xl shadow-uniform prose-h2:mb-0 prose-h2:mt-0"
    >
      <p className="text-lg font-bold mb-2">{name}</p>
      <p>{reviewText}</p>

      <div className="flex items-center gap-1 mt-2">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewCard
