import { useQuery } from "@tanstack/react-query";
import { getVideoLists } from "../../../services/videoService";

export default function useGetVideoLists() {
  const { data, isLoading } = useQuery({
    queryKey: ["all-videos"],
    queryFn: getVideoLists,
  });

  return { isLoading, data };
}
