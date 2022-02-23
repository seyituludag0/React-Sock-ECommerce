import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  Dropdown,
  Input,
  TextArea,
  Card,
  Form,
  Grid,
  Image,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import CampaignManagementService from "../../../services/CampaignManagementService";
import CategoryService from "../../../services/CategoryService";
export default function CampaignCreate() {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
  let categoryService = new CategoryService();
    categoryService.getAllCategory().then((result)=>setCategories(result.data.data))
  }, [])

  const formik = useFormik({
    initialValues: {
      campaignName: "",
      currentCategoryId:"",
      couponCode: "",
      discountRate:"",
      campaignExpiredDate: "",
      campaignDetails: "",
      campaignBannerImage: "",
    },
    // validationSchema: validationRules,
    onSubmit: (campaign) => {
      let campaignManagementService = new CampaignManagementService();
      campaignManagementService
        .create(campaign)
        .then((result) => toast.success(result.data.message))
        .catch("HATA!");
    },
  });

  const categoryOption = categories.map((category, index) => ({
    key: index,
    text: category.name,
    value: category.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div className="my-div">
      <Grid.Column>
        <div className="xxxxxxx" style={{ marginTop: "-4rem" }}>
          <Card fluid>
            <Card.Content header="Kampanya Oluştur" />
            <Card.Content>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Field>
                  <Input
                    placeholder="Kampanya Adı"
                    error={Boolean(formik.errors.campaignName).toString()}
                    value={formik.values.campaignName}
                    name="campaignName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.campaignName &&
                    formik.touched.campaignName && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.campaignName}
                      </div>
                    )}
                </Form.Field>

                <Form.Field>
              <Dropdown
                clearable
                item
                placeholder="Kampanyanın geçerli olduğu ürünler"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "currentCategoryId")
                }
                onBlur={formik.onBlur}
                id="currentCategoryId"
                value={formik.values.currentCategoryId}
                options={categoryOption}
              />
              {formik.errors.categoryId && formik.touched.currentCategoryId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.currentCategoryId}
                </div>
              )}
            </Form.Field>

                {/* <Form.Field>
                  <Input
                    placeholder="Kupon Kodu"
                    error={Boolean(formik.errors.couponCode).toString()}
                    value={formik.values.couponCode}
                    name="couponCode"
                    disabled
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.couponCode && formik.touched.couponCode && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.couponCode}
                    </div>
                  )}
                </Form.Field> */}
                <Form.Field>
                  <Input
                    placeholder="İndirim Oranı"
                    error={Boolean(formik.errors.discountRate).toString()}
                    value={formik.values.discountRate}
                    name="discountRate"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.discountRate && formik.touched.discountRate && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.discountRate}
                    </div>
                  )}
                </Form.Field>
                <Form.Field>
                  <Input
                    style={{ width: "100%" }}
                    type="date"
                    error={Boolean(formik.errors.campaignExpiredDate)}
                    value={formik.values.campaignExpiredDate}
                    onBlur={formik.handleBlur}
                    name="campaignExpiredDate"
                    placeholder="Kampanyanın Bitiş Tarihi"
                  />
                  {formik.errors.campaignExpiredDate &&
                    formik.touched.campaignExpiredDate && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.campaignExpiredDate}
                      </div>
                    )}
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Resim Url"
                    error={Boolean(formik.errors.campaignBannerImage).toString()}
                    value={formik.values.campaignBannerImage}
                    name="campaignBannerImage"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.campaignBannerImage &&
                    formik.touched.campaignBannerImage && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.campaignBannerImage}
                      </div>
                    )}
                </Form.Field>

                <Form.Field>
                  <TextArea
                    placeholder="Açıklama"
                    style={{ minHeight: 100 }}
                    error={Boolean(formik.errors.campaignDetails).toString()}
                    value={formik.values.campaignDetails}
                    name="campaignDetails"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.campaignDetails &&
                    formik.touched.campaignDetails && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.campaignDetails}
                      </div>
                    )}
                </Form.Field>
                <Button
                  content="Kampanyayı Oluştur"
                  labelPosition="right"
                  icon="pencil"
                  primary
                  type="submit"
                  style={{ marginLeft: "20px" }}
                />
              </Form>
            </Card.Content>
          </Card>
        </div>
      </Grid.Column>
    </div>
  );
}
