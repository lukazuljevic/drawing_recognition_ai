import { useMutation } from "react-query";
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

const getPrediction = async ({
  imageBase64,
  previousLabel,
}: GetPredictionParams) => {
  const response = await api.post<GetPredictionParams, GetPredictionResponse>(
    PREDICTION_PATH,
    { imageBase64, previousLabel }
  );
  return response;
};

export const useGetPrediction = () => {
  return useMutation({
    mutationFn: getPrediction,
  });
};
