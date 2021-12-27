import React, { useEffect, useState } from "react";
import ProductOrderService from "../../services/ProductOrderService";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Card, CardContent, CardActions, Button  
} from "@material-ui/core";
import { ExpandMore, CheckCircle } from "@material-ui/icons";
import moment from "moment";
import "moment/locale/tr";

export default function ProductOrderInfo() {
  const [productOrders, setProductOrders] = useState([]);

  useEffect(() => {
    let productOrderService = new ProductOrderService();
    productOrderService
      .getProductOrderByUserId(121)
      .then((result) => setProductOrders(result.data.data));
  }, []);

  return (
    <>
      {productOrders.map((order, key) => (
        <div key={key}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="col-1">
                <Avatar
                  alt="Remy Sharp"
                  src={order.product.productImage.image1}
                  sx={{ width: 56, height: 56 }}
                />
              </div>
              <div className="col-5">
                Sipariş No: <span>{order.orderNumber}</span>
                <br />
                <span>{moment(order.orderDate).format("LL")}</span>
              </div>
              <div className="col-5">
                <CheckCircle style={{ color: "green" }} />
                Sipariş tamamlandı
              </div>
              <div>{order.price}₺</div>
            </AccordionSummary>
            <AccordionDetails>
                
              <Card sx={{ minWidth: 275 }}>
                 
                <CardContent> <div>
                      <img src={order.product.productImage.image1} width="100px"/>
                  </div>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="div">
                    benevolent
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </>
  );
}
