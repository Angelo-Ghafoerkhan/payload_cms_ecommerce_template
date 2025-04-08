import { ClipLoader } from 'react-spinners'

const LoaderFullPage = ({ loading }: { loading: boolean }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#4A90E2" loading={loading} size={150} />
    </div>
  )
}

export default LoaderFullPage
