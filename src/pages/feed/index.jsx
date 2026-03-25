import { useEffect, useState } from "react";
import api from "../../utils/api";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import Error from "../../components/error";
import Card from "../../components/card";

const Feed = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/search", {
          params: {
            query: "trending",
          },
        });

        console.log("SEARCH RESPONSE:", res.data);

        const feedData = Array.isArray(res.data?.data) ? res.data.data : [];
        setData(feedData);
      } catch (err) {
        console.log("SEARCH ERROR:", err);
        setError(err?.response?.data?.msg || err.message || "Bir hata oluştu");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, []);

  const videos = Array.isArray(data)
    ? data.filter((item) => item?.videoId)
    : [];

  if (loading) return <SkeletonLoader />;
  if (error) return <Error message={error} />;

  return (
    <div className="page">
      <div className="space-y-8">
        {videos.length > 0 ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
            {videos.map((video) => (
              <Card key={video.videoId} video={video} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-400">Gösterilecek video bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;