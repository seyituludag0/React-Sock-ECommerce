import React, { useState } from "react";
import "./styles.css";
import { useFormik } from "formik";
import { Button, Form, Grid } from "semantic-ui-react";
import { Box, TextField } from "@mui/material";
import { FaStar } from "react-icons/fa";
import CommentService from "../../services/CommentService";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";

export default function CommentUpdate({ comment, sockId }) {
  const labels = {
    1: "Çok Kötü",
    2: "Kötü",
    3: "Orta",
    4: "İyi",
    5: "Çok İyi",
  };

  const [state] = useUserContext();
  const userId = state?.authenticatedUser?.id;

  const [rating, setRating] = useState(comment.starCount);
  const [hover, setHover] = useState(null);
  const formik = useFormik({
    initialValues: {
      id: comment.id,
      starCount: comment.starCount,
      description: comment.description,
    },
    onSubmit: (values) => {
      values.customerId = userId;
      values.sockId = sockId;
      values.starCount = rating;
      console.log("Values: ", values);
      let commentService = new CommentService();
      commentService
        .updateComment(values)
        .then((result) => toast.success(result.data.message));
      values.starCount = null;
      values.description = "";
    },
  });

  return (
    <div className="comment-box">
      <form onSubmit={formik.handleSubmit}>
        {/* <label>Ürünü Değerlendir</label> */}
        <div className="rating">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label>
                <input
                  key={i}
                  type="radio"
                  name="starCount"
                  value={comment.starCount}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  className="star"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  size={40}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          <div>
            {rating !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
            )}
          </div>
        </div>
        <Form.Field>
          <Grid stackable>
            <Grid.Column width={8}>
              <TextField
                className="my-input"
                style={{ marginLeft: "10rem", marginRight: "-18rem" }}
                id="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                onBlur={formik.handleBlur}
                type="text"
                error={formik.errors.description}
                label="Yorum"
                multiline
                fullWidth
                rows={4}
                variant="standard"
              />
              {formik.errors.description && formik.touched.description && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.description}
                </div>
              )}
            </Grid.Column>
          </Grid>
        </Form.Field>{" "}
        <br />
        <Button color="red">Yorumu Yayınla</Button>
      </form>
    </div>
  );
}
