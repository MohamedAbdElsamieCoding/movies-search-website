export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface MovieReviewsResponse {
  id: number;
  results: Review[];
}