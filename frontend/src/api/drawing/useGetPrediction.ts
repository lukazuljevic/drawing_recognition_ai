import { useQuery } from "react-query";
import { api } from "../base";
import { PREDICTION_PATH } from "../../constants/paths";

type GetPredictionParams = {
  imageBase64: string;
  previousLabel: string;
};

type GetPredictionResponse = {
  prediction: string;
  confidence: number;
};

const getPrediction = async () => {
  const response = await api.post<GetPredictionParams, GetPredictionResponse>(
    PREDICTION_PATH
  );

  return response;
};

export const useGetPrediction = ({
  imageBase64,
  previousLabel,
}: GetPredictionParams) => {
    
  return useQuery({
    queryKey: ["prediction", imageBase64, previousLabel],
    queryFn: getPrediction,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
