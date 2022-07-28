import axios from "axios"
import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import FilterReviews from "./FilterReviews";
import { useLocation } from 'react-router-dom';
import SortBy from "./SortBy";


export default function ReviewList() {
const [reviews, setReviews] = useState([])

const search = useLocation().search;
const category = new URLSearchParams(search).get('category')

const [sortColumn, setSortColumn] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

useEffect(() => {
    axios
    .get(`https://my-games-app1.herokuapp.com/api/reviews`, {
      params: {
        category: category,
        sort_by: sortColumn,
        order: sortOrder,
      },
    })
    .then((res) => {
      setReviews(res.data.reviews);
    });
}, [category, sortColumn, sortOrder]);
  

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            <FilterReviews />
            <p><SortBy setSortColumn={setSortColumn} setSortOrder={setSortOrder} /></p>
            <ul>
                {reviews.map((review) =>{
                return (
                    <li key={review.review_id}>
                        <ReviewCard review_id={review.review_id} title={review.title} category={review.category} owner={review.owner} votes={review.votes} />
                    </li>
                )
                })}
            </ul>
        </div>
    )
}