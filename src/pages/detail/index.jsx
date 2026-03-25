import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import Spinner from "../../components/loader/spinner";
import Error from "../../components/error";
import ReactPlayer from "react-player";
import ChannelInfo from "./channel-info";
import Description from "./description";
import Comments from "./comments";
import Card from "../../components/card";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [video, setVideo] = useState(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("v");

  useEffect(() => {
    if (!id) {
      setError("Video id bulunamadı");
      setLoading(false);
      return;
    }

    const params = { id };

    setLoading(true);
    setError(null);

    api
      .get("/video/info", { params })
      .then((res) => {
        console.log("DETAIL RESPONSE:", res.data);
        setVideo(res.data || null);
      })
      .catch((err) => {
        console.log("DETAIL ERROR:", err);
        setError(err?.response?.data?.msg || err.message || "Bir hata oluştu");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!video) return <Error message="Video verisi bulunamadı" />;

  const relatedVideos = Array.isArray(video?.relatedVideos?.data)
    ? video.relatedVideos.data
    : [];

  return (
    <div className="page max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-6">
      {/* Video Alanı */}
      <div className="flex-1">
        {/* Oynatıcı */}
        <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${id}`}
            width="100%"
            height="100%"
            controls
          />
        </div>

        {/* Bilgiler */}
        <div className="space-y-4">
          <h1 className="text-xl font-bold line-clamp-2 leading-tight">
            {video?.title || "Başlıksız video"}
          </h1>

          <ChannelInfo video={video} />

          <Description video={video} />

          <Comments videoId={id} />
        </div>
      </div>

      {/* Önerilen Videolar */}
      <div className="lg:w-[400px]">
        <h2 className="text-lg font-semibold mb-4 hidden lg:block">
          İlgili Videolar
        </h2>

        <div className="flex flex-col gap-5 @container">
          {relatedVideos.length > 0 ? (
            relatedVideos
              .filter((item) => item?.videoId)
              .map((item) => (
                <Card key={item.videoId} video={item} isRow />
              ))
          ) : (
            <p className="text-zinc-400">İlgili video bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;