/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { encode as btoa } from "base-64";
import axios from "axios";
import { useEffect, useState } from 'react';

export default function data() {
  const Plugin = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts" 
  });
  const [feedbacks, setfeedbacks] = useState([]);

  useEffect(() => {
    client.get('?_limit=10').then((response) => {
        setPosts(response.data);
    });
  }, []);

  async function awpSendRequest() {
    const username = "dilruba_dev2";
    const password = "QzoU hqvK iEM3 wTVA WsGy Qwz8";
    const url = "https://dev2.floopbox.com/wp-json/thd/v1/feedbacks";
    let auth = btoa(`${username}:${password}`);
    auth = `Basic ${auth}`;
    fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: new Headers({
        Authorization: auth,
        Origin: "*",
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  
  // if (document.readyState !== "loading") {
  //   feedbacks = awpSendRequest();
  // } else {
  //   document.addEventListener("DOMContentLoaded", awpSendRequest);
  // }

  const feedback = [
    { image: LogoAsana, name: "Asana", reason: "100", comment: "comment", date: "date" },
    { image: LogoAsana, name: "plugin 1", reason: "100", comment: "comment", date: "date" },
    { image: LogoAsana, name: "plugin 1", reason: "100", comment: "comment", date: "date" },
    { image: LogoAsana, name: "plugin 1", reason: "100", comment: "comment", date: "date" },
    { image: LogoAsana, name: "plugin 1", reason: "100", comment: "comment", date: "date" },
  ];

  function feedbackTableRows(item) {
    return {
      plugin: <Plugin name="Asana" />,
      reason: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.reason}
        </MDTypography>
      ),
      comment: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          done
        </MDTypography>
      ),
      date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          done
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" color="text">
          <Icon>more_vert</Icon>
        </MDTypography>
      ),
    };
  }
  const feeds = feedback.map(feedbackTableRows);
  return {
    columns: [
      { Header: "plugin", accessor: "plugin", width: "30%", align: "left" },
      { Header: "reason", accessor: "reason", align: "left" },
      { Header: "comment", accessor: "comment", align: "center" },
      { Header: "date", accessor: "date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: feeds,
  };
}
